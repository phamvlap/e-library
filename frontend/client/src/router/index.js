import { createRouter, createWebHistory } from 'vue-router';

import bookRoutes from '@/router/bookRoutes.js';
import userRoutes from '@/router/userRoutes.js';
import { useReaderStore } from '@/stores/reader.js';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                alias: 'home',
                name: 'home',
                component: () => import('@/pages/Home.vue'),
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('@/pages/Login.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/pages/Register.vue'),
            },
            bookRoutes,
        ],
    },
    {
        path: '/user',
        component: () => import('@/layouts/UserLayout.vue'),
        children: [userRoutes],
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/layouts/MainLayout.vue'),
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
    scrollBehavior(to, from, savedPosition) {
        return {
            top: 0,
        };
    },
});

router.beforeEach(async (to, from, next) => {
    const store = useReaderStore();
    const isReaderLoggedIn = localStorage.getItem('reader-is-logged-in');

    if (isReaderLoggedIn) {
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
