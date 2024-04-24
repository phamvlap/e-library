export default {
    path: '',
    component: () => import('@/pages/User.vue'),
    children: [
        {
            path: '',
            alias: 'profile',
            name: 'user.profile',
            component: () => import('@/components/user/UserProfile.vue'),
        },
        {
            path: 'borrowed-books',
            name: 'user.borrowed-books',
            component: () => import('@/components/user/UserBorrowedBooks.vue'),
            children: [
                {
                    path: ':id/detail/',
                    name: 'user.borrowed-book-detail',
                    component: () => import('@/components/user/UserBorrowedBookDetail.vue'),
                },
            ],
        },
        {
            path: ':id/borrowing-order',
            name: 'user.borrowing-order',
            component: () => import('@/components/user/UserBorrowingOrder.vue'),
        },
    ],
};
