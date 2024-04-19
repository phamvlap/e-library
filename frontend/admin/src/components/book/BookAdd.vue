<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import BookForm from './BookForm.vue';
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Thêm sách mới</h1>
        <div class="p-2">
            <RouterLink to="/admin/books" class="btn btn-outline-secondary btn-back">
                <FontAwesomeIcon :icon="faChevronLeft" />
                <span class="ms-2">Quay lại</span>
            </RouterLink>
        </div>
        <!-- form -->
        <div class="p-2">
            <BookForm />
        </div>
    </div>
</template>

<style scoped>
.btn-back {
    font-size: 1.6rem;
}
.select,
.textarea-input {
    font-size: 1.6rem;
}
</style>
