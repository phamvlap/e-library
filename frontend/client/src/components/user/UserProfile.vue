<script setup>
import { ref } from 'vue';
import UserForm from '@/components/user/UserForm.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

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
    <div class="p-2">
        <h2 class="text-center position-relative d-flex align-items-center justify-content-center">
            <span>Tài khoản của tôi</span>
            <div class="position-absolute end-0 edit-btn">
                <button class="btn btn-warning">
                    <FontAwesomeIcon :icon="faPen" />
                    <span class="ms-1">Cập nhật</span>
                </button>
            </div>
        </h2>
        <div class="row mt-4">
            <div class="col col-md-8 offset-md-2">
                <UserForm :reader="reader" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.edit-btn {
    top: 50%;
    transform: translateY(-50%);
}
</style>
