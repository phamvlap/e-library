<script setup>
import { ref } from 'vue';
import UserForm from '@/components/user/UserForm.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useReaderStore } from '@/stores/reader.js';

const store = useReaderStore();
let reader = ref({
    ...store.reader,
});
let isUpdating = ref(false);

const transfromToUpdating = () => {
    isUpdating.value = true;
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
                <UserForm :reader="reader" :isUpdating="isUpdating" />
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
