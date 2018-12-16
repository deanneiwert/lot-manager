import VueRouter from 'vue-router'
// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/user/Dashboard'
import Admin from './pages/admin/Admin'
import AdminDashboard from './pages/admin/Dashboard'
import Users from './pages/admin/users'
import _403 from './pages/403'
import _404 from './pages/404'

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
    // ADMIN ROUTES
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            auth: {
                roles: [1],
                redirect: {
                    name: 'login'
                },
                forbiddenRedirect: '/403'
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
            }
        ]
    },
    // OTHER ROUTES
    {
        path: '/403',
        name: '403',
        component: _403,
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
export default router;
