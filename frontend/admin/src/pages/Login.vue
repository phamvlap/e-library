<script setup>
import LoginForm from './../components/LoginForm.vue';

const account = {
    account_id: '',
    account_password: '',
};
</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="p-2 form-container mt-5">
            <h2 class="text-center">Đăng nhập</h2>
            <LoginForm :account="account" />
        </div>
    </div>
</template>

<style scoped>
.form-container {
    width: 500px;
}
</style>
