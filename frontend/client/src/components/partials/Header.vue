<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const menu = [
    {
        name: 'Trang chủ',
        path: '/',
    },
    {
        name: 'Sách',
        path: '/books',
    },
];
</script>
<template>
    <div>
        <div class="container">
            <div class="d-flex justify-content-between p-3 border">
                <div class="d-flex align-items-center">
                    <h1>E-library</h1>
                    <ul class="ms-5">
                        <li class="d-inline" v-for="item in menu" :key="item.path">
                            <RouterLink :to="item.path" class="p-1 mx-3">{{ item.name }}</RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center position-relative p-2 account-section">
                        <p class="me-2">Nguyen Van A</p>
                        <FontAwesomeIcon :icon="faAngleDown" />
                        <div
                            :class="{
                                'position-absolute account-menu': true,
                            }"
                        >
                            <ul>
                                <li class="account-menu__item">
                                    <RouterLink
                                        :to="{
                                            name: 'user.profile',
                                        }"
                                        class="account-menu__link d-inline-block py-3 px-4 w-100"
                                        >Trang cá nhân</RouterLink
                                    >
                                </li>
                                <li class="account-menu__item">
                                    <RouterLink to="/logout" class="account-menu__link d-inline-block py-3 px-4 w-100"
                                        >Đăng xuất</RouterLink
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- <div class="d-flex align-items-center">
                        <RouterLink to="/login" class="me-3">Đăng nhập</RouterLink>
                        <RouterLink to="/register">Đăng ký</RouterLink>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.account-menu {
    display: none;
    background-color: white;
    border: 1px solid #ccc;
    width: 180px;
    top: 100%;
    right: 0;
    z-index: 1;
}
.account-section:hover .account-menu {
    display: block;
}
.account-menu__item:last-child {
    color: var(--danger-color);
}
.account-menu__link:hover {
    background-color: rgba(0, 0, 0, 0.08);
}
</style>
