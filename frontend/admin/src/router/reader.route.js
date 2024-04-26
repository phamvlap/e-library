export default {
    path: 'readers',
    name: 'readers',
    component: () => import('@/pages/Readers.vue'),
    children: [
        {
            path: '',
            name: 'reader.list',
            component: () => import('@/components/reader/ReaderList.vue'),
        },
    ],
    meta: {
        requiresAuth: true,
    },
};
