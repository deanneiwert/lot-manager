import {
    communityService
} from '../../_services';


export default {
    namespaced: true,
    state: {
        status: {},
        chunk: null,
        options: null,
        currentCommunityId: null,
        lots: null
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
        },
        getLotsRequest(state) {
            state.status = {
                gettingLots: true
            };
        },
        getLotsSuccess(state, Lots) {
            state.status = {
                LotsRetrieved: true
            };
            state.lots = Lots;
        },
        getLotsFailure(state) {
            state.status = {};
            state.lots = null;
        },
        setCommunity(state, communityId) {
            state.currentCommunityId = communityId;
        },
    },
    actions: {
        setCurrentCommunity({
            commit
        }, communityId) {
            commit('setCommunity', communityId);
        },
        getCommunities({
            dispatch,
            commit
        }, options) {
            commit('getCommunitiesRequest', options);
            communityService.getCommunities(options)
                .then(
                    CommunitiesChunk => {
                        commit('getCommunitiesSuccess', CommunitiesChunk);
                        dispatch('alert/clear', '', {
                            root: true
                        });
                    },
                    error => {
                        commit('getCommunitiesFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        },
        getLots({
            dispatch,
            commit
        }, communityId) {
            commit('getLotsRequest');
            communityService.getLots(communityId)
                .then(
                    Lots => {
                        commit('getLotsSuccess', Lots);
                        dispatch('alert/clear', '', {
                            root: true
                        });
                    },
                    error => {
                        commit('getLotsFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        }
    }
}
