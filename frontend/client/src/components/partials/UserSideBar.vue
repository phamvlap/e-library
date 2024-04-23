<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
    <div class="border p-2">
        <div class="p-3 d-flex align-items-center justify-content-center border-bottom account-section">
            <FontAwesomeIcon :icon="faUserCircle" />
            <p class="ms-2">Nguyen Van A</p>
        </div>
        <div>
            <ul>
                <li>
                    <RouterLink
                        :to="{
                            name: 'user.profile',
                        }"
                        class="d-inline-block py-3 px-4 w-100 account-menu__link"
                        >Tài khoản của tôi</RouterLink
                    >
                </li>
                <li>
                    <RouterLink
                        :to="{
                            name: 'user.borrowed-books',
                        }"
                        class="d-inline-block py-3 px-4 w-100 account-menu__link"
                        >Sách mượn</RouterLink
                    >
                </li>
                <li>
                    <RouterLink to="/logout" class="d-inline-block py-3 px-4 w-100 account-menu__link"
                        >Đăng xuất</RouterLink
                    >
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
</style>
