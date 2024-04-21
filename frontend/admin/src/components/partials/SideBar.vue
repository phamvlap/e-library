<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const menuList = [
    {
        name: 'Trang chủ',
        path: '/admin',
    },
    {
        name: 'Quản lý sách',
        path: '/admin/books',
    },
    {
        name: 'Quản lý mượn trả',
        path: '/admin/borrowings',
    },
    {
        name: 'Quản lý độc giả',
        path: '/admin/readers',
    },
    {
        name: 'Quản lý nhân viên',
        path: '/admin/staffs',
    },
];
const route = useRoute();
const currentPath = computed(() => {
    return route.path;
});
onMounted(() => {});
</script>

<template>
    <div class="h-100 p-2 wrapper border-end">
        <div class="d-flex flex-column">
            <div class="p-2 admin-section d-flex flex-column align-items-center justify-content-center">
                <div class="dropdown-wrapper">
                    <div class="dropdown w-100">
                        <div class="dropdown-toggle w-100 text-center" data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="admin-account p-2 d-inline-block">
                                <FontAwesomeIcon :icon="faUserCircle" />
                                <span class="d-inline mx-2">S1001</span>
                            </div>
                        </div>
                        <ul class="dropdown-menu w-100">
                            <li class="dropdown-item p-3 dropdown__item">Tài khoản của tôi</li>
                            <li class="dropdown-item p-3 dropdown__item">Đăng xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="p-2">
                <ul>
                    <li v-for="(item, index) in menuList">
                        <RouterLink
                            :to="item.path"
                            :class="{
                                'd-inline-block w-100 p-3 menu-item': true,
                                'active-menu': (currentPath.split('/admin')[1].length > 0
                                    ? currentPath.split('/admin')[1]
                                    : currentPath
                                ).includes(
                                    item.path.split('/admin')[1].length > 0 ? item.path.split('/admin')[1] : item.path,
                                ),
                            }"
                            @click="activeMenu = index"
                            >{{ item.name }}</RouterLink
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.admin-section {
    font-size: 1.6rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.admin-account {
    font-size: 2rem;
}
.dropdown-wrapper {
    width: 280px;
}
.dropdown__item {
    font-size: 1.6rem;
}
.dropdown__item:last-child {
    color: var(--danger-color);
}
.admin-account__icon-down {
    font-size: 1.6rem;
}
.admin-account__icon-down:hover {
    cursor: pointer;
}
.account-list__item:hover,
.dropdown__item:hover,
.menu-item:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
}
.active-menu {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
