export default {
    path: 'publishers',
    name: 'publishers',
    component: () => import('@/pages/Publishers.vue'),
    children: [
        {
            path: '',
            name: 'publisher.list',
            component: () => import('@/components/publisher/PublisherList.vue'),
        },
    ],
    meta: {
        requiresAuth: true,
    },
};
