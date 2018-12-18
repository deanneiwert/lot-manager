import 'es6-promise/auto';
import Axios from 'axios';
import './bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './Index';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import store from './store';

// Set Vue globally
window.Vue = Vue

// Set ElementUI
Vue.use(ElementUI, {
    locale
});

// Set Vue router
Vue.router = router
Vue.use(VueRouter)

axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`

// Load Index
Vue.component('index', Index)
const app = new Vue({
    el: '#app',
    router,
    store
});
