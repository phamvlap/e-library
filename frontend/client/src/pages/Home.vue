<script setup>
import { ref, onMounted } from 'vue';
import BookCard from './../components/book/BookCard.vue';
import BookService from '@/services/book.service.js';
import Helper from '@/utils/helper.js';
import { useReaderStore } from '@/stores/reader.js';

const store = useReaderStore();
let newBooks = ref([]);
let popularBooks = ref([]);

const getNewBooks = async (quantity) => {
    try {
        const bookService = new BookService();
        const response = await bookService.getNewBooks(quantity);
        if (response.status === 'success') {
            const data = response.data.map((book) => {
                return {
                    _id: book._id,
                    book_image: Helper.formatImageUrl(book.images[0]?.image_url),
                    book_name: book.book_name,
                    book_authors: book.book_authors,
                    book_topic: book.topic[0].topic_name,
                };
            });
            newBooks.value = data;
        }
    } catch (error) {
        console.log(error);
    }
};
const getPopularBooks = async (quantity) => {
    try {
        const bookService = new BookService();
        const response = await bookService.getPopularBooks(quantity);
        if (response.status === 'success') {
            const data = response.data.map((book) => {
                return {
                    _id: book._id,
                    book_image: Helper.formatImageUrl(book.images[0]?.image_url),
                    book_name: book.book_name,
                    book_borrowed_quantity: book.book_borrowed_quantity,
                    book_authors: book.book_authors,
                    book_topic: book.topic[0].topic_name,
                };
            });
            popularBooks.value = data;
        }
    } catch (error) {
        console.log(error);
    }
};

onMounted(async () => {
    await getNewBooks(6);
    await getPopularBooks(6);
});
</script>
<template>
    <div>
        <div class="container">
            <div class="position-relative">
                <img src="@/assets/images/background.jpg" alt="" class="w-100 image" />
                <div class="position-absolute greeting">
                    <h1 class="fw-bold message-title">Chào mừng bạn đến với E-library</h1>
                    <RouterLink to="/books" class="d-inline-block mt-3 py-4 px-5 bg-light link rounded-2 fw-bold"
                        >Khám phá ngay</RouterLink
                    >
                </div>
            </div>
            <div class="mt-4">
                <h2 class="section-title">Sách mới</h2>
                <div class="row mt-3">
                    <div class="col col-md-2" v-for="book in newBooks" :key="book._id">
                        <BookCard :book="book" />
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-2">
                    <RouterLink to="/books" class="d-inline-block p-1">Xem tất cả</RouterLink>
                </div>
            </div>
            <div class="mt-4">
                <h2 class="section-title">Sách đươc mượn nhiều</h2>
                <div class="row mt-3">
                    <div class="col col-md-2" v-for="book in popularBooks" :key="book._id">
                        <BookCard :book="book" />
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-2">
                    <RouterLink to="/books" class="d-inline-block p-1">Xem tất cả</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.greeting {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
}
.message-title {
    font-size: 3.4rem;
    text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
}
.link {
    color: var(--first-level-color);
    font-size: 2rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
.link:hover {
    opacity: 0.95;
}
.section-title {
    font-size: 2.2rem;
    font-weight: bold;
}
.image {
    background-color: rgba(0, 0, 0, 0.6);
}
</style>
