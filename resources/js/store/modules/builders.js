import {
    builderService
} from '../../_services';


export default {
    namespaced: true,
    state: {
        status: {},
        builders: [],
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
            state.builders = Builders;
        },
        getBuildersFailure(state) {
            state.status = {};
            state.builders = null;
        }
    },
    actions: {
        getBuilders({
            dispatch,
            commit,
        }) {
            commit('getBuildersRequest');
            builderService.getBuilders()
                .then(
                    Builders => {
                        commit('getBuildersSuccess', Builders);
                        dispatch('alert/clear', '',  {
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
    }
}
