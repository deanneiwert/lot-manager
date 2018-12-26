import {
    builderService
} from '../../_services';


export default {
    namespaced: true,
    state: {
        status: {},
        builders: null,
        currentBuilderId: null
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
            // update the builder in the builder collection or append to he collection
            let builderIndex = state.builders.findIndex(b => b.id === Builder.id);
            if (builderIndex >= 0) {
                Vue.set(state.builders, builderIndex, Builder)
            } else {
                state.builder.push(Builder);
            }
        },
        getBuildersFailure(state) {
            state.status = {};
            state.builders = null;
        },
        setBuilder(state, builderId) {
            state.currentBuilderId = builderId;
        },
    },
    actions: {
        setCurrentBuilder({
            commit
        }, builderId) {
            commit('setBuilder', builderId);
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
