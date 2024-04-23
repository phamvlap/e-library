<script setup>
import { RouterView } from 'vue-router';
import BorrowedItem from './BorrowedItem.vue';
</script>
<template>
    <div class="p-2">
        <h2 class="text-center">Sách mượn</h2>
        <div class="row p-0 m-0 mt-3">
            <div class="col col-md-6 p-2">
                <BorrowedItem />
                <BorrowedItem />
                <BorrowedItem />
                <BorrowedItem />
                <BorrowedItem />
            </div>
            <div class="col col-md-6 p-2">
                <h2 class="text-center mb-2">Chi tiết sách mượn</h2>
                <RouterView />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
