<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Helper from '@/utils/helper.js';

const router = useRouter();
const props = defineProps({
    book: {
        type: Object,
        required: true,
    },
});
const book = {
    ...props.book,
};

const goToDetail = (bookId) => {
    router.push({
        name: 'user.borrowed-book-detail',
        params: {
            id: bookId,
        },
    });
};
</script>
<template>
    <div class="border p-2" @click="goToDetail(book.book_id)">
        <div class="row p-0 m-0">
            <div class="col col-md-3 p-0 d-flex justify-content-center align-items-center">
                <img :src="book.book_image" alt="book" class="image" />
            </div>
            <div class="col col-md-9 p-2">
                <h3 class="mb-2">{{ book.book_name }}</h3>
                <div class="mt-4">
                    <span class="fw-bold">Ngày mượn: </span>
                    <span>{{ Helper.formatDateTime(book.borrowed_date) }}</span>
                </div>
                <div class="mt-2">
                    <span class="fw-bold">Số lượng mượn: </span>
                    <span>{{ book.borrowing_quantity }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.image {
    width: 80px;
    height: 80px;
    object-fit: cover;
}
</style>
