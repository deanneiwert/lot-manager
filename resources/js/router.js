import VueRouter from 'vue-router';
// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/user/Dashboard';
import Admin from './pages/admin/Admin';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Communities from './pages/admin/Communities';
import LotStatuses from './pages/admin/LotStatuses';
import AdminLots from './pages/admin/Lots';
import Lots from './pages/user/Lots';
import _401 from './pages/401';
import _404 from './pages/404';
import store from './store';

// Routes
const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            auth: undefined
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },
    // USER ROUTES
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            auth: true
        }
    },
    {
        path: '/lots',
        name: 'lots',
        component: Lots,
        meta: {
            auth: true
        }
    },
    // ADMIN ROUTES
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            auth: {
                roles: [1],
            }
        },
        children: [{
                path: 'dashboard',
                name: 'admin.dashboard',
                component: AdminDashboard,
            },
            {
                path: 'users',
                name: 'admin.users',
                component: Users,
            },
            {
                path: 'communities',
                name: 'admin.communities',
                component: Communities,
            },
            {
                path: 'lot-statuses',
                name: 'admin.lot-statuses',
                component: LotStatuses,
            }, {
                path: 'lots',
                name: 'admin.lots',
                component: AdminLots,
            }
        ]
    },
    // OTHER ROUTES
    {
        path: '/401',
        name: '401',
        component: _401,
        meta: {
            auth: undefined
        }
    },
    {
        path: '/404',
        name: '404',
        component: _404,
        meta: {
            auth: undefined
        }
    },
    {
        path: '*',
        redirect: "/404"
    },
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

// set up a guard on the routes to leverage the meta data.
router.beforeEach((to, from, next) => {

    // get logged in user data if available
    const user = store.state.auth.user;
    const token = user ? user.token : null;
    const role = user ? user.role_id : null;

    if (to.matched.some(route => isUnauthenticatedRequest(route, token))) {
        next({
            name: 'login'
        });
    } else if (to.matched.some(route => isUnautorizedRequest(route, role))) {
        next({
            name: "401"
        });
    }
    //record.meta.roles || role.contains(record.meta.roles))){

    next();
})

/**
 * Checks route and determines if user needs to be authenticated
 */
function isUnauthenticatedRequest(route, token) {
    // no authorization is required, r
    return route.meta.auth && !token;
}

/**
 * Checks route against provided role to determine if authorized
 */
function isUnautorizedRequest(route, role) {

    let roles = route.meta.auth ? route.meta.auth.roles : null;
    return roles && !roles.includes(role);
}

export default router;
