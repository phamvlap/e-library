<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterForm from './../components/RegisterForm.vue';
import ReaderService from '@/services/reader.service.js';
import Swal from 'sweetalert2';

const router = useRouter();
let reader = ref({
    reader_first_name: '',
    reader_last_name: '',
    reader_dob: '',
    reader_gender: '',
    reader_address: '',
    reader_phone: '',
    reader_password: '',
});

const submitRegisterReader = async (data) => {
    try {
        const readerService = new ReaderService();
        const response = await readerService.createReader(data);
        if (response.status === 'success') {
            Swal.fire({
                title: 'Đăng ký thành công',
                html: `Mã độc giả của bạn là: <b>${response.data.reader.reader_id}</b>`,
                icon: 'success',
                confirmButtonText: 'Đồng ý',
            }).then(() => {
                router.push({ name: 'login' });
            });
        } else {
            Swal.fire({
                title: 'Đăng ký thất bại',
                text: response.message,
                icon: 'error',
                confirmButtonText: 'Đồng ý',
            });
        }
    } catch (error) {
        console.log(error);
    }
};
</script>
<template>
    <div>
        <div class="container">
            <div class="d-flex align-items-center justify-content-center mt-5">
                <div class="form-contanier">
                    <h2 class="text-center">Đăng ký tài khoản</h2>
                    <RegisterForm :reader="reader" class="mt-4" @submit:reader="submitRegisterReader" />
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
