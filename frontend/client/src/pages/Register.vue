<script setup>
import { ref } from 'vue';
import RegisterForm from './../components/RegisterForm.vue';

let reader = ref({
    reader_first_name: '',
    reader_last_name: '',
    reader_dob: '',
    reader_gender: '',
    reader_address: '',
    reader_phone: '',
    reader_password: '',
    reader_confirm_password: '',
});
</script>
<template>
    <div>
        <div class="container">
            <div class="d-flex align-items-center justify-content-center mt-5">
                <div class="form-contanier">
                    <h2 class="text-center">Đăng ký tài khoản</h2>
                    <RegisterForm :reader="reader" class="mt-4" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-contanier {
    width: 600px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
