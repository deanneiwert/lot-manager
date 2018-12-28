import {
    userService
} from '../../_services';

const defaultState = () => {
    return {
        status: {},
        chunk: null,
        options: {
            pageSize: 15,
            nameFilter: '',
            page: 1,
        },
    }
};

export default {
    namespaced: true,
    state: defaultState(),
    mutations: {
        getUsersRequest(state, options) {
            state.status = {
                gettingUsers: true
            };
            state.options = options;
        },
        getUsersSuccess(state, users) {
            state.status = {
                usersRetrieved: true
            };
            state.chunk = users;
        },
        getUsersFailure(state) {
            state.status = {};
            state.chunk = null;
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
        getUsers({
            dispatch,
            commit
        }, options) {
            commit('getUsersRequest', options);
            userService.getUsers(options)
                .then(
                    usersChunk => {
                        commit('getUsersSuccess', usersChunk);
                    },
                    error => {
                        commit('getUsersFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        },
    }
}
