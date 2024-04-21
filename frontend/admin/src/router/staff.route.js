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
        {
            path: 'add',
            name: 'staff.add',
            component: () => import('@/components/staff/StaffAdd.vue'),
        },
        {
            path: ':id/edit',
            name: 'staff.edit',
            component: () => import('@/components/staff/StaffAdd.vue'),
        },
    ],
};
