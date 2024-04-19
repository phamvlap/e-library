export default {
    path: 'borrowings',
    name: 'borrowings',
    component: () => import('@/pages/Borrowings.vue'),
    children: [
        {
            path: '',
            name: 'borrowing.list',
            component: () => import('@/components/borrowing/BorrowingList.vue'),
        },
        {
            path: 'detail',
            name: 'borrowing.detail',
            component: () => import('@/components/borrowing/BorrowingDetail.vue'),
        },
    ],
};
