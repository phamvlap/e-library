<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useStaffStore } from './../../stores/staff.js';
import Swal from 'sweetalert2';

let menuList = [
    {
        name: 'Trang chủ',
        to: {
            name: 'home',
        },
    },
    {
        name: 'Quản lý sách',
        to: {
            name: 'book.list',
        },
    },
    {
        name: 'Quản lý mượn trả',
        to: {
            name: 'borrowing.list',
        },
    },
    {
        name: 'Quản lý độc giả',
        to: {
            name: 'reader.list',
        },
    },
    {
        name: 'Quản lý thể loại',
        to: {
            name: 'topic.list',
        },
    },
    {
        name: 'Quản lý nhà xuất bản',
        to: {
            name: 'publisher.list',
        },
    },
];
const router = useRouter();
const store = useStaffStore();
const staff = store.staff;
if (staff.staff_role === 'ADMIN') {
    menuList.push({
        name: 'Quản lý nhân viên',
        to: {
            name: 'staff.list',
        },
    });
}

let isMounted = ref(false);
const currentPathName = computed(() => router.currentRoute.value.name);

const handleLogout = () => {
    Swal.fire({
        title: 'Đăng xuất',
        text: 'Bạn có chắc chắn muốn đăng xuất?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đăng xuất',
        cancelButtonText: 'Hủy',
    }).then((result) => {
        if (result.isConfirmed) {
            store.logout();
        }
    });
};

onMounted(() => {
    isMounted.value = true;
});
</script>

<template>
    <div class="h-100 p-2 wrapper border-end">
        <div class="d-flex flex-column">
            <div class="p-2 admin-section d-flex flex-column align-items-center justify-content-center">
                <div class="dropdown-wrapper">
                    <div class="dropdown w-100" v-if="isMounted">
                        <div class="dropdown-toggle w-100 text-center" data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="admin-account p-2 d-inline-block">
                                <FontAwesomeIcon :icon="faUserCircle" />
                                <span class="d-inline mx-2">{{ staff.staff_name }}</span>
                            </div>
                        </div>
                        <ul class="dropdown-menu w-100">
                            <li class="dropdown-item p-3 dropdown__item">Tài khoản của tôi</li>
                            <li class="dropdown-item p-3 dropdown__item" @click="handleLogout">Đăng xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="p-2">
                <ul>
                    <li v-for="(item, index) in menuList" :key="index">
                        <RouterLink
                            :to="{
                                name: item.to.name,
                            }"
                            :class="{
                                'd-inline-block w-100 p-3 menu-item fw-bold': true,
                                'active-menu':
                                    item.to.name === 'home'
                                        ? currentPathName === item.to.name
                                        : currentPathName.includes(item.to.name.split('.')[0]),
                            }"
                        >
                            {{ item.name }}
                        </RouterLink>
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
    color: var(--first-level-color);
}
</style>
