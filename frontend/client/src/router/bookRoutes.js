export default {
    path: '/books',
    name: 'books',
    component: () => import('@/pages/Books.vue'),
    children: [
        {
            path: '',
            name: 'books.list',
            component: () => import('@/components/book/BookList.vue'),
        },
        {
            path: ':id/detail',
            name: 'book.detail',
            component: () => import('@/components/book/BookDetail.vue'),
        },
    ],
};
