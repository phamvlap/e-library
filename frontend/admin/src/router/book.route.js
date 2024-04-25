export default {
    path: 'books',
    alias: ['/', '/home'],
    name: 'books',
    component: () => import('@/pages/Books.vue'),
    children: [
        {
            path: '',
            name: 'book.list',
            component: () => import('@/components/book/BookList.vue'),
        },
        {
            path: 'add',
            name: 'book.add',
            component: () => import('@/components/book/BookAdd.vue'),
        },
        {
            path: ':id/edit',
            name: 'book.edit',
            component: () => import('@/components/book/BookAdd.vue'),
        },
        {
            path: ':id/detail',
            name: 'book.detail',
            component: () => import('@/components/book/BookDetail.vue'),
        },
    ],
};
