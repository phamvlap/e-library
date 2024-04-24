<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserCircle, faKey, faBook, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useReaderStore } from '@/stores/reader.js';
import Swal from 'sweetalert2';

const store = useReaderStore();

const accountMenu = [
    {
        title: 'Tài khoản của tôi',
        to: {
            name: 'user.profile',
        },
        icon: faKey,
    },
    {
        title: 'Sách mượn',
        to: {
            name: 'user.borrowed-books',
        },
        icon: faBook,
    },
    {
        title: 'Đăng xuất',
        to: {
            name: '',
        },
        icon: faArrowRightFromBracket,
        onClick: () => {
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
        },
    },
];
const router = useRouter();

const currentRouteName = computed(() => {
    return router.currentRoute.value.name;
});
</script>
<template>
    <div class="p-2">
        <div class="p-3 d-flex align-items-center justify-content-center border-bottom account-section">
            <FontAwesomeIcon :icon="faUserCircle" />
            <p class="ms-2">Nguyen Van A</p>
        </div>
        <div>
            <ul>
                <li
                    v-for="(item, index) in accountMenu"
                    :key="index"
                    class="d-flex align-items-center account-menu-item"
                >
                    <RouterLink
                        :to="{
                            name: item.to.name,
                        }"
                        :class="{
                            ['d-inline-block py-3 px-4 w-100 account-menu__link']: true,
                            ['account-menu-item__active']:
                                item.to.name === 'user.profile'
                                    ? currentRouteName === item.to.name
                                    : [
                                          'user.borrowed-books',
                                          'user.borrowed-book-detail',
                                          'user.borrowing-order',
                                      ].includes(currentRouteName),
                        }"
                        @click="item.onClick && item.onClick()"
                    >
                        <FontAwesomeIcon :icon="item.icon" />
                        <span class="d-inline-block ms-2">{{ item.title }}</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.account-section {
    font-size: 1.8rem;
    font-weight: 500;
}
.account-menu__link:hover {
    background-color: rgba(0, 0, 0, 0.09);
}
.account-menu-item:last-child {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: var(--danger-color);
}
.account-menu-item__active {
    color: var(--first-level-color);
}
</style>
