import router from '../../router';
import {
    userService
} from '../../_services';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    status: {
        loggedIn: true
    },
    user
} : {
    status: {},
    user: null
};

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        loginRequest(state, user) {
            state.status = {
                loggingIn: true
            };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = {
                loggedIn: true
            };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        registerRequest(state, user) {
            state.status = {
                registering: true
            };
            state.user = user;
        },
        registerSuccess(state, user) {
            state.status = {
                registered: true
            };
            state.user = user;
        },
        registerFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    },
    getters: {
        getCommunityById: (state) => (id) => {
            let community = null;

            // try to get community from user
            if (!_.isEmpty(state.auth.user.builder) && state.auth.user.builder.communities) {
                community = state.auth.user.builder.communities.find(community => community.id === id);
            }

            return community;
        }
    },
    actions: {
        login({
            dispatch,
            commit
        }, formData) {
            commit('loginRequest', {
                email: formData.email
            });

            userService.login(formData)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        dispatch('builders/setCurrentBuilder', user.builder, {
                            root: true
                        });
                        if (user.role_id === 1) {
                            router.push({
                                name: 'admin.dashboard'
                            });
                        } else {
                            router.push({
                                name: 'dashboard'
                            });
                        }
                    },
                    error => {
                        commit('loginFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        },
        register({
            dispatch,
            commit
        }, formData) {
            commit('registerRequest', {
                email: formData.email
            });

            userService.register(formData)
                .then(
                    user => {
                        commit('registerSuccess', user);
                        router.push('/');
                    },
                    error => {
                        commit('registerFailure');
                        dispatch('alert/error', error.message, {
                            root: true
                        });
                    }
                );
        },
        logout({
            commit
        }) {
            userService.logout();
            commit('logout');
        },
    },
};
