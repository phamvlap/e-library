<script setup>
import { ref } from 'vue';
import UserForm from '@/components/user/UserForm.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useReaderStore } from '@/stores/reader.js';
import ReaderService from '@/services/reader.service.js';
import { toast } from 'vue3-toastify';

const store = useReaderStore();
let reader = ref({
    ...store.reader,
});
let isUpdating = ref(false);

const transfromToUpdating = () => {
    isUpdating.value = true;
};
const updateReader = async (data) => {
    try {
        const readerService = new ReaderService();
        console.log(data);
        const response = await readerService.updateReader(reader.value.reader_id, data);
        if (response.status === 'success') {
            await store.getMe();
            toast.success('Cập nhật thông tin độc giả thành công');
            isUpdating.value = false;
        }
    } catch (error) {
        toast.error('Cập nhật thông tin độc giả thất bại');
    }
};
</script>
<template>
    <div class="p-2">
        <h2 class="text-center position-relative d-flex align-items-center justify-content-center">
            <span>Tài khoản của tôi</span>
            <div class="position-absolute end-0 edit-btn">
                <button v-if="!isUpdating" class="btn btn-warning" @click="transfromToUpdating">
                    <FontAwesomeIcon :icon="faPen" />
                    <span class="ms-1">Cập nhật</span>
                </button>
            </div>
        </h2>
        <div class="row mt-4">
            <div class="col col-md-8 offset-md-2">
                <UserForm :reader="reader" :isUpdating="isUpdating" @submit:reader="updateReader" />
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
