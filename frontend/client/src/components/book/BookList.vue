<script setup>
import { ref, onMounted } from 'vue';
import BookCard from './BookCard.vue';
import BookService from '@/services/book.service.js';
import Helper from '@/utils/helper.js';
import Searchbar from './Searchbar.vue';

let books = ref([]);
let newBooks = ref([]);
let search_name = ref('');
let topic_id = ref('');
let isMounted = ref(false);
let isSearching = ref(false);

const getBooks = async (filter = {}) => {
    try {
        const bookService = new BookService();
        let customFilter = {};
        Object.keys(filter).map((key) => {
            if (filter[key] !== '') {
                customFilter[key] = filter[key];
            }
        });
        const response = await bookService.getBooks(customFilter);
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
            books.value = data;
        }
    } catch (error) {
        console.log(error);
    }
};
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
const submitSearchForm = async (searchName, topicId) => {
    searchName === '' ? (isSearching.value = false) : (isSearching.value = true);
    search_name.value = searchName;
    await getBooks({
        book_name: searchName,
        book_topic: topicId,
    });
};

onMounted(async () => {
    await getBooks();
    await getNewBooks(5);
    isMounted.value = true;
});
</script>
<template>
    <div>
        <div class="container">
            <Searchbar :search_name="search_name" :topic_id="topic_id" @submit:filter="submitSearchForm" />

            <div v-if="isMounted && !isSearching">
                <h2 class="section-title">Sách mới</h2>
                <div class="row mt-3 justify-content-center">
                    <div class="col col-md-2" v-for="book in newBooks" :key="book._id">
                        <BookCard :book="book" />
                    </div>
                </div>
            </div>
            <div v-if="isMounted">
                <h2 class="section-title" v-if="isSearching">Kết quả tìm kiếm cho từ khóa "{{ search_name }}"</h2>
                <h2 class="section-title" v-else>Dành cho bạn</h2>
                <div class="row mt-3">
                    <template v-if="books.length > 0">
                        <div class="col col-md-2" v-for="book in books" :key="book._id">
                            <BookCard :book="book" />
                        </div>
                    </template>
                    <div v-else>
                        <div class="col">
                            <p class="text-center">Không tìm thấy sách nào phù hợp</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
