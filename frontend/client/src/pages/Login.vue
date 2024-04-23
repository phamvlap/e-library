<script setup>
import { ref, onMounted } from 'vue';
import LoginForm from './../components/LoginForm.vue';
import { useReaderStore } from '@/stores/reader.js';

let reader = ref({
    reader_id: '',
    reader_password: '',
});
const store = useReaderStore();

const submitLogin = async (reader) => {
    let data = {
        account_id: reader.reader_id,
        account_password: reader.reader_password,
    };
    await store.login(data);
};
// {
//     "account_id": "R1003",
//     "account_password": "nguyen123"
// }
onMounted(() => {});
</script>
<template>
    <div>
        <div class="container">
            <div class="d-flex align-items-center justify-content-center mt-5">
                <div class="form-contanier">
                    <h2 class="text-center">Đăng ký tài khoản</h2>
                    <LoginForm :reader="reader" class="mt-4" @submit:reader="submitLogin" />
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
