import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Admin/Home.vue'
import Signup from "../views/Register/Signup.vue";
import Group from '../views/Admin/Group/main.vue';
import OneGroup from '../views/Admin/Group/OneGroup.vue';

import Teacher from "../views/Admin/Teacher/main.vue";
import Science from "../views/Admin/Science/main.vue";
import User from "../views/Admin/User/main.vue";
import Times from "../views/Admin/Times/main.vue";
import Loading from '../views/loading.vue'
import store from '../store';


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
                path: '/groups',
                name: 'Group',
                component: Group,

            },
            {
                path: '/teachers',
                name: "Teacher",
                component: Teacher
            },
            {
                path: '/sciences',
                name: "Sciences",
                component: Science
            },
            {
                path: '/users',
                name: "Users",
                component: User
            },
            {
                path: '/times',
                name: "Times",
                component: Times
            },
            {
                path: '/groups/:id',
                component: OneGroup,
            }
        ],
        meta: { requiresAuth: true },
    },
    {
        path: '/signup',
        name: "Signup",
        component: Signup
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/loading',
        name: Loading,
        component: Loading
    },
    {
        path: "*",
        // component: "<template>Errorku</template>"
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // console.log(store.getters('auth/isAuthenticated')
        if (!store.getters['auth/isAuthenticated']) {
            next({
                path: '/signup',
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})
export default router