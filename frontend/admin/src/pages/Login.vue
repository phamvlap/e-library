<script setup>
import { ref } from 'vue';
import LoginForm from './../components/LoginForm.vue';
import { useStaffStore } from './../stores/staff.js';

const store = useStaffStore();
const account = ref({
    account_id: '',
    account_password: '',
});

const loginStaff = async (data) => {
    try {
        await store.login(data);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="p-2 form-container mt-5">
            <h2 class="text-center">Đăng nhập</h2>
            <LoginForm :account="account" @submit:staff-login="loginStaff" />
        </div>
    </div>
</template>

<style scoped>
.form-container {
    width: 500px;
}
</style>
