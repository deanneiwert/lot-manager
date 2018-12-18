import {
    communityService
} from '../../_services';


export default {
    namespaced: true,
    state: {
        status: {},
        chunk: null,
        options: {
            pageSize: 15,
            nameFilter: '',
            page: 1,
        },
    },
    mutations: {
        getCommunitiesRequest(state, options) {
            state.status = {
                gettingCommunities: true
            };
            state.options = options;
        },
        getCommunitiesSuccess(state, Communities) {
            state.status = {
                CommunitiesRetrieved: true
            };
            state.chunk = Communities;
        },
        getCommunitiesFailure(state) {
            state.status = {};
            state.chunk = null;
        }
    },
    actions: {
        getCommunities({
            dispatch,
            commit
        }, options) {
            commit('getCommunitiesRequest', options);
            communityService.getCommunities(options)
                .then(
                    CommunitiesChunk => {
                        commit('getCommunitiesSuccess', CommunitiesChunk);
                    },
                    error => {
                        commit('getCommunitiesFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        },
    }
}
