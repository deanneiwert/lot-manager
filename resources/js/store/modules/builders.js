import {
    builderService
} from '../../_services';


export default {
    namespaced: true,
    state: {
        status: {},
        builders: null,
        currentBuilder: {},
    },
    mutations: {
        getBuildersRequest(state) {
            state.status = {
                gettingBuilders: true
            };
        },
        getBuildersSuccess(state, Builders) {
            state.status = {
                BuildersRetrieved: true
            };
            _.map(Builders, function (b) {
                b.communities = [];
            });
            state.builders = Builders;
        },
        getBuildersFailure(state) {
            state.status = {};
            state.builders = null;
        },
        getBuilderRequest(state) {
            state.status = {
                gettingBuilder: true
            };
        },
        getBuilderSuccess(state, Builder) {
            state.status = {
                BuilderRetrieved: true
            };
            // update the builder in the builder collection or append to the collection
            let builderIndex = state.builders.findIndex(b => b.id === Builder.id);
            if (builderIndex >= 0) {
                Vue.set(state.builders, builderIndex, Builder);
            } else {
                state.builder.push(Builder);
            }

            // update the currently selected builder
            state.currentBuilder = Builder;
        },
        getBuildersFailure(state) {
            state.status = {};
            state.builders = null;
        },
        setBuilderRequest(state, builderId) {
            state.status = {
                BuilderSet: true
            }
            state.currentBuilder = this.getters['builders/getBuilderById'](builderId);
        },
    },
    getters: {
        getBuilderById: (state) => (id) => {
            let builder = state.builders.find(builder => builder.id === id);
            return builder ? builder : {}
        },
        getCommunityById: (state) => (id) => {
            let community = state.currentBuilder.communities.find(community => community.id === id);
            return community ? community : {}
        }
    },
    actions: {
        setCurrentBuilder({
            commit
        }, builderId) {
            commit('setBuilderRequest', builderId);
        },
        getBuilders({
            dispatch,
            commit,
        }) {
            commit('getBuildersRequest');
            builderService.getBuilders()
                .then(
                    Builders => {
                        commit('getBuildersSuccess', Builders);
                        dispatch('alert/clear', '', {
                            root: true
                        });
                    },
                    error => {
                        commit('getBuildersFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        },
        getBuilderDetail({
            dispatch,
            commit
        }, builderId) {
            commit('getBuilderRequest');
            builderService.getBuilder(builderId)
                .then(
                    Builder => {
                        commit('getBuilderSuccess', Builder);
                        dispatch('alert/clear', '', {
                            root: true
                        });
                    },
                    error => {
                        commit('getBuilderFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        }

    }
}
