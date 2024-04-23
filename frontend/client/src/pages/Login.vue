<script setup>
import { ref } from 'vue';
import LoginForm from './../components/LoginForm.vue';

let reader = ref({
    reader_id: '',
    reader_password: '',
});
</script>
<template>
    <div>
        <div class="container">
            <div class="d-flex align-items-center justify-content-center mt-5">
                <div class="form-contanier">
                    <h2 class="text-center">Đăng ký tài khoản</h2>
                    <LoginForm :reader="reader" class="mt-4" />
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
