import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import users from './modules/users';
import communities from './modules/communities';
import builders from './modules/builders';
import lotStatuses from './modules/lotStatuses';
import alert from './modules/alert';
/*
import {
    alert
} from './modules/alert';*/

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {

    },
    modules: {
        alert,
        auth,
        communities,
        users,
        builders,
        lotStatuses,
    },
    getters: {

    },
});
