import { createRouter, createWebHistory } from 'vue-router';

import bookRoutes from '@/router/book.route.js';
import readerRoutes from '@/router/reader.route.js';
import borrowingRoutes from '@/router/borrowing.route.js';
import staffRoutes from '@/router/staff.route.js';

const routes = [
    {
        path: '/admin',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/pages/Home.vue'),
            },
            bookRoutes,
            readerRoutes,
            borrowingRoutes,
            staffRoutes,
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
        name: 'notfound',
        component: () => import('@/pages/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
