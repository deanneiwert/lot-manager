import {
    builderService
} from '../../_services';

const defaultState = () => {
    return {
        status: {},
        builders: null,
        currentBuilder: {},
    }
};

export default {
    namespaced: true,
    state: defaultState(),
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
        setBuilderByIdRequest(state, builderId) {
            state.status = {
                BuilderSet: true
            }
            state.currentBuilder = this.getters['builders/getBuilderById'](builderId);
        },
        setBuilderRequest(state, builder) {
            state.status = {
                BuilderSet: true
            }
            state.currentBuilder = builder;
        },
        clearRequest(state) {
            Object.assign(state, defaultState());
        },
    },
    getters: {
        getBuilderById: (state) => (id) => {
            let builder = state.builders.find(builder => builder.id === id);
            return builder ? builder : {}
        },
        getCommunityById: (state) => (id) => {
            let community = null;

            // try to get community from currentBuilder
            if (!_.isEmpty(state.currentBuilder) && state.currentBuilder.communities) {
                community = state.currentBuilder.communities.find(community => community.id === id);
            }

            return community;
        }
    },
    actions: {
        clear({
            commit
        }) {
            commit('clearRequest');
        },
        setCurrentBuilderById({
            commit
        }, builderId) {
            commit('setBuilderByIdRequest', builderId);
        },
        setCurrentBuilder({
            commit
        }, builder) {
            commit('setBuilderRequest', builder);
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
