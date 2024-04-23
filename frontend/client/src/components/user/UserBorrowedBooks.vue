<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import BorrowedItem from './BorrowedItem.vue';
import BorrowingDetailService from '@/services/borrowingDetail.service.js';
import { useReaderStore } from '@/stores/reader.js';
import Helper from '@/utils/helper.js';

const store = useReaderStore();
let reader = store.reader;
let borrowedBooks = ref([]);

const fetchBooksOfUser = async () => {
    try {
        const borrowingDetailService = new BorrowingDetailService();
        const response = await borrowingDetailService.getBorrowingDetails({
            reader_id: reader.reader_id,
        });
        if (response.status === 'success') {
            response.data.forEach((borrowedBook) => {
                borrowedBooks.value.push({
                    book_id: borrowedBook.book[0]._id,
                    book_name: borrowedBook.book[0].book_name,
                    borrowed_date: borrowedBook.borrowingDetail.borrowed_date,
                    borrowing_quantity: borrowedBook.borrowingDetail.borrowing_quantity,
                    book_image: Helper.formatImageUrl(borrowedBook.book[0].images[0].image_url),
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
};
onMounted(async () => {
    await fetchBooksOfUser();
    // console.log(borrowedBooks.value);
});
</script>
<template>
    <div class="p-2">
        <h2 class="text-center">Sách mượn</h2>
        <div class="row p-0 m-0 mt-3">
            <div class="col col-md-6 p-2">
                <h2 class="text-center mb-2">Danh sách sách mượn</h2>
                <BorrowedItem v-for="book in borrowedBooks" :key="book.book_id" :book="book" />
            </div>
            <div class="col col-md-6 p-2">
                <h2 class="text-center mb-2">Chi tiết sách mượn</h2>
                <RouterView />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
