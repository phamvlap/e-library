<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
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
    <div class="border p-2" @click="goToDetail(100)">
        <div class="row p-0 m-0">
            <div class="col col-md-3 p-0 d-flex justify-content-center align-item-center">
                <img src="@/assets/images/truyen_kieu_1.jpeg" alt="book" class="image" />
            </div>
            <div class="col col-md-9 p-2">
                <h3 class="mb-2">Truyện Kiều</h3>
                <div class="mt-2">
                    <span class="fw-bold">Ngày mượn: </span>
                    <span>2021-09-01</span>
                </div>
                <div class="mt-2">
                    <span class="fw-bold">Số lượng: </span>
                    <span>20</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.image {
    width: 68px;
    height: 68px;
    object-fit: cover;
}
</style>
