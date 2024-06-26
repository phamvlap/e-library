import { createRouter, createWebHistory } from 'vue-router';

import bookRoutes from './book.route.js';
import readerRoutes from './reader.route.js';
import borrowingRoutes from './borrowing.route.js';
import staffRoutes from './staff.route.js';
import topicRoutes from './topic.route.js';
import publisherRoutes from './publisher.route.js';
import { useStaffStore } from './../stores/staff.js';

const routes = [
    {
        path: '/',
        alias: '/admin',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/pages/Home.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            bookRoutes,
            readerRoutes,
            borrowingRoutes,
            staffRoutes,
            topicRoutes,
            publisherRoutes,
        ],
    },
    {
        path: '/login',
        component: () => import('@/layouts/EmptyLayout.vue'),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('@/pages/Login.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/layouts/EmptyLayout.vue'),
        children: [
            {
                path: '',
                name: 'not.found',
                component: () => import('@/pages/NotFound.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const store = useStaffStore();
    const isLoggedStaff = localStorage.getItem('staff-is-logged-in');

    if (isLoggedStaff) {
        await store.getMe();
    }
    if (to.meta.requiresAuth && !store.isAuth() && to.name !== 'login') {
        next({
            name: 'login',
        });
    } else {
        next();
    }
});

export default router;
