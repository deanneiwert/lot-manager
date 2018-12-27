import {
    communityService
} from '../../_services';


export default {
    namespaced: true,
    state: {
        status: {},
        chunk: {},
        options: null,
        currentCommunity: {},
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
        setCommunityByIdRequest(state, communityId) {
            state.status = {
                CommunitySet: true
            }
            state.currentCommunity = this.getters['builders/getCommunityById'](communityId);
        },
        setCommunityRequest(state, community) {
            state.status = {
                CommunitySet: true
            }
            state.currentCommunity = community;
        },
        unsetCommunityRequest(state) {
            state.status = {
                CommunityUnset: true
            }
            state.currentCommunity = {};
        },
        unsetLotsRequest(state) {
            state.status = {
                LotsUnset: true
            }
            state.lots = null;
        }
    },
    actions: {
        setCurrentCommunityById({
            commit
        }, communityId) {
            // try to get community from builders store
            let community = this.getters['builders/getCommunityById'](communityId);

            // if not found, try to get from auth store
            if (!community) {
                community = this.getters['auth/getCommunityById'](communityId);
            }

            // if still not found, try to get from database
            // TO DO: make API call to community by ID (i.e. new route /communities/{communityId})

            commit('setCommunityByIdRequest', community);
        },
        setCurrentCommunity({
            commit
        }, community) {
            commit('setCommunityRequest', community);
        },
        unsetCurrentCommunity({
            commit
        }) {
            commit('unsetCommunityRequest');
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
        },
        unsetLots({
            commit
        }) {
            commit('unsetLotsRequest');
        }
    }
}
