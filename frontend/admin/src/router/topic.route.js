export default {
    path: 'topics',
    name: 'topics',
    component: () => import('@/pages/Topics.vue'),
    children: [
        {
            path: '',
            name: 'topic.list',
            component: () => import('@/components/topic/TopicList.vue'),
        },
    ],
    meta: {
        requiresAuth: true,
    },
};
