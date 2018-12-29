import {
    lotStatusService
} from '../../_services';

const defaultState = () => {
    return {
        status: {},
        lotStatuses: null,
    }
};

export default {
    namespaced: true,
    state: defaultState(),
    mutations: {
        getLotStatusesRequest(state) {
            state.status = {
                gettingLotStatuses: true
            };
        },
        getLotStatusesSuccess(state, LotStatuses) {
            state.status = {
                LotStatusesRetrieved: true
            };
            state.lotStatuses = LotStatuses;
        },
        getLotStatusesFailure(state) {
            state.status = {};
            state.lotStatuses = null;
        },
        setLotStatusesRequest(state, LotStatuses) {
            state.status = {
                settingLotStatuses: true
            }
            state.lotStatuses = LotStatuses;
        },
        setLotStatusesSuccess(state) {
            state.status = {
                LotStatusesSet: true
            };
        },
        setLotStatusesFailure(state, originalStates) {
            state.status = {};
            state.lotStatuses = originalStates;
        },
        clearRequest(state) {
            Object.assign(state, defaultState());
        },
    },
    actions: {
        clear({
            commit
        }) {
            commit('clearRequest');
        },
        getLotStatuses({
            dispatch,
            commit,
            rootState,
        }) {
            commit('getLotStatusesRequest');

            // get builderId from currentBuilder in builders store,
            // if not found, get it from auth store and set currentBuilder
            let builderId = rootState.builders.currentBuilder.id;
            if (!builderId) {
                builderId = rootState.auth.user.builder_id;
                dispatch('builders/setCurrentBuilder', rootState.auth.user.builder, {
                    root: true
                });
            }

            lotStatusService.getLotStatuses(builderId)
                .then(
                    LotStatuses => {
                        commit('getLotStatusesSuccess', LotStatuses);
                        dispatch('alert/clear', '', {
                            root: true
                        });
                    },
                    error => {
                        commit('getLotStatusesFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        },
        setLotStatuses({
            dispatch,
            commit,
            rootState
        }, LotStatuses) {
            let original = this.state.lotStatuses.lotStatuses;
            commit('setLotStatusesRequest', LotStatuses);

            let statusData = _.map(LotStatuses, function (status) {
                return {
                    id: status.id,
                    name: status.name
                }
            });
            lotStatusService.setLotStatuses(statusData, rootState.builders.currentBuilder.id)
                .then(
                    LotStatuses => {
                        // able to save lot statuses
                        commit('setLotStatusesSuccess');

                        // updated order values returned from database, update store
                        commit('getLotStatusesSuccess', LotStatuses);
                    },
                    error => {
                        // reset the original lotStatuses data in the store
                        commit('setLotStatusesFailure', original);
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        }
    },
}
