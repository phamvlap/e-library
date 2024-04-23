<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToBookDetail = (bookId) => {
    router.push({
        name: 'book.detail',
        params: {
            id: bookId,
        },
    });
};

const goToBorrowingOrder = () => {
    router.push({
        name: 'user.borrowing-order',
    });
};
</script>
<template>
    <div class="card card-container mb-4">
        <img
            src="@/assets/images/truyen_kieu_1.jpeg"
            class="card-img-top card-img"
            alt="..."
            @click="goToBookDetail(10001)"
        />
        <div class="card-body">
            <h4 class="card-title" @click="goToBookDetail(10001)">Truyen Kieu</h4>
            <div class="card-subtitle fw-bold mt-3">
                <span class="">Tác giả: </span>
                <span class="">Nguyen Du</span>
            </div>
            <div class="card-subtitle mt-2">
                <span class="">Danhn mục: </span>
                <span class=""> Truyện cổ tích </span>
            </div>
            <div class="d-flex justify-content-center">
                <button class="mt-4 btn btn-outline-info" @click="goToBorrowingOrder">Đặt mượn</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card-container {
    color: var(--dark-text-color);
}
.card-title {
    font-size: 1.6rem;
    font-weight: bold;
}
.card-subtitle {
    font-size: 1.4rem;
}
.card-img {
    height: 240px;
    object-fit: cover;
}
</style>
