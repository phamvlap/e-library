export default {
    path: 'staffs',
    name: 'staffs',
    component: () => import('@/pages/Staffs.vue'),
    children: [
        {
            path: '',
            name: 'staff.list',
            component: () => import('@/components/staff/StaffList.vue'),
        },
    ],
};
