<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BorrowedItem from './BorrowedItem.vue';
import BorrowingDetailService from '@/services/borrowingDetail.service.js';
import { useReaderStore } from '@/stores/reader.js';
import Helper from '@/utils/helper.js';

const store = useReaderStore();
let reader = store.reader;
const route = useRoute();
let borrowedBooks = ref([]);
let isMounted = ref(false);
// let currentId = ref('');

let currentPath = computed(() => {
    return route.path;
});

const fetchBooksOfUser = async () => {
    try {
        const borrowingDetailService = new BorrowingDetailService();
        const response = await borrowingDetailService.getBorrowingDetails({
            reader_id: reader.reader_id,
        });
        if (response.status === 'success') {
            let data = [];
            response.data.forEach((item) => {
                let isExist = false;
                for (let i = 0; i < data.length; i++) {
                    if (
                        data[i].book_id === item.book[0]._id &&
                        data[i].borrowed_date === item.borrowingDetail.borrowed_date
                    ) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    data.push({
                        book_id: item.book[0]._id,
                        book_name: item.book[0].book_name,
                        borrowed_date: item.borrowingDetail.borrowed_date,
                        borrowing_quantity: item.borrowingDetail.borrowing_quantity,
                        book_image: Helper.formatImageUrl(item.book[0].images[0].image_url),
                    });
                }
            });
            borrowedBooks.value = data;
        }
    } catch (error) {
        console.log(error);
    }
};
// const activeBook = (bookId) => {
    // console.log(bookId)
    // router.push({
    //     name: 'user.borrowed-book-detail',
    //     params: {
    //         id: bookId,
    //     },
    // });
// };  
onMounted(async () => {
    await fetchBooksOfUser();
    isMounted.value = true;
});
</script>
<template>
    <div class="p-2">
        <h2 class="text-center">Sách mượn của tôi</h2>
        <div class="row p-0 m-0 mt-3" v-if="isMounted">
            <div class="col col-md-6 p-2">
                <h2 class="text-center mb-2">Danh sách sách mượn</h2>
                <BorrowedItem v-for="book in borrowedBooks" :key="book.book_id" :book="book" />
            </div>
            <div class="col col-md-6 p-2">
                <h2 class="text-center mb-2">Chi tiết sách mượn</h2>
                <p v-if="currentPath === '/user/borrowed-books'" class="text-center mt-3">
                    Chọn sách để xem thêm chi tiết
                </p>
                <RouterView :key="Math.floor(Math.random() * 1000000)" />
            </div>
        </div>
    </div>
</template>
<style scoped>  
</style>
