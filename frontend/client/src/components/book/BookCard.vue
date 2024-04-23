<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    book: Object,
});
const book = ref({
    ...props.book,
});

const router = useRouter();

const goToBookDetail = (bookId) => {
    router.push({
        name: 'book.detail',
        params: {
            id: bookId,
        },
    });
};
const goToBorrowingOrder = (bookId) => {
    router.push({
        name: 'user.borrowing-order',
        params: {
            id: bookId,
        },
    });
};
</script>
<template>
    <div class="card card-container mb-4">
        <img :src="book.book_image" class="card-img-top card-img" alt="..." @click="goToBookDetail(book._id)" />
        <div class="card-body">
            <h4 class="card-title" @click="goToBookDetail(book._id)">{{ book.book_name }}</h4>
            <div class="card-subtitle fw-bold mt-3">
                <span class="">Tác giả: </span>
                <span class="">{{ book.book_authors }}</span>
            </div>
            <div class="card-subtitle mt-2">
                <span class="">Chủ đề: </span>
                <span class="">{{ book.book_topic }}</span>
            </div>
            <div class="d-flex justify-content-center">
                <button class="mt-4 btn btn-outline-info" @click="goToBorrowingOrder(book.book_id)">Đặt mượn</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    color: var(--dark-text-color);
}
.card-title {
    --max-line: 2;
    font-weight: bold;
    line-height: 1.8rem;
    height: 3.6rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--max-line);
}
.card-subtitle {
    font-size: 1.4rem;
}
.card-img {
    height: 240px;
    object-fit: cover;
}
</style>
