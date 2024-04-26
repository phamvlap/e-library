<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleDown, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useReaderStore } from '@/stores/reader.js';
import Swal from 'sweetalert2';

const store = useReaderStore();
const router = useRouter();

const menu = [
    {
        name: 'Trang chủ',
        path: '/',
        to: {
            name: 'home',
        }
    },
    {
        name: 'Sách',
        path: '/books',
        to: {
            name: 'books.list',
        }
    },
];

const handleLogout = () => {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn đăng xuất?',
        showCancelButton: true,
        confirmButtonText: 'Đăng xuất',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#dc3545',
    }).then((result) => {
        if (result.isConfirmed) {
            store.logout();
        }
    });
};
</script>
<template>
    <div>
        <div class="container">
            <div class="d-flex justify-content-between p-3">
                <div class="d-flex align-items-center">
                    <RouterLink
                        :to="{
                            name: 'home',
                        }"
                    >
                        <FontAwesomeIcon :icon="faBookOpen" class="brand-icon" />
                        <span class="brand-name fw-bold ms-1">E-LIBRARY</span></RouterLink
                    >
                    <ul class="ms-5">
                        <li class="d-inline" v-for="item in menu" :key="item.path">
                            <RouterLink
                                :to="{
                                    name: item.to.name,
                                }"
                                :class="{
                                    ['p-1 mx-3 fw-bold']: true,
                                    'menu-nav-active':
                                        item.path === '/'
                                            ? router.currentRoute.value.path === item.path
                                            : router.currentRoute.value.path.startsWith(item.path),
                                }"
                                >{{ item.name }}</RouterLink
                            >
                        </li>
                    </ul>
                </div>
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center position-relative p-2 account-section" v-if="store.reader">
                        <p class="me-2">{{ store.reader.reader_first_name + ' ' + store.reader.reader_last_name }}</p>
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
                                    <div
                                        class="account-menu__link d-inline-block py-3 px-4 w-100"
                                        @click="handleLogout"
                                    >
                                        Đăng xuất
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex align-items-center" v-else>
                        <RouterLink :to="{
                            name: 'login'
                        }" class="me-3">Đăng nhập</RouterLink>
                        <RouterLink :to="{
                            name: 'register'
                        }">Đăng ký</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.brand-name {
    color: var(--first-level-color);
    font-size: 2.6rem;
}
.brand-icon {
    color: var(--first-level-color);
    font-size: 2.4rem;
}
.menu-nav-active {
    color: var(--first-level-color);
}
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
