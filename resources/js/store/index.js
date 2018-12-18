import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import users from './modules/users';
import {
    alert
} from './modules/alert';

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {

    },
    modules: {
        auth,
        users,
        alert,
    },
    getters: {

    },
});
