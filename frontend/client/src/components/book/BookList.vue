<script setup>
import { ref, onMounted, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BookCard from './BookCard.vue';
import BookService from '@/services/book.service.js';
import TopicService from '@/services/topic.service.js';
import Helper from '@/utils/helper.js';

let books = ref([]);
let newBooks = ref([]);
let topics = ref([]);
let search_name = ref('');
let topic_id = ref('');
let isMounted = ref(false);

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
const getTopics = async () => {
    try {
        const topicService = new TopicService();
        const response = await topicService.getTopics();
        if (response.status === 'success') {
            topics.value = response.data;
        }
    } catch (error) {
        console.log(error);
    }
};
const submitSearchForm = async (event) => {
    event.preventDefault();
    await getBooks({
        book_name: search_name.value,
    });
};
watch(topic_id, async (newValue) => {
    if (topic_id.value !== '') {
        await getBooks({
            book_topic: topic_id.value,
        });
    } else {
        await getBooks();
    }
});
onMounted(async () => {
    await getBooks();
    await getNewBooks(5);
    await getTopics();
    isMounted.value = true;
});
</script>
<template>
    <div>
        <div class="container">
            <div class="d-flex justify-content-center my-5">
                <div>
                    <form class="rounded-pill border d-flex over-flow-hidden search-bar" @submit="submitSearchForm">
                        <input
                            type="text"
                            class="search-input p-3 flex-grow-1"
                            placeholder="Nhập tên sách cần tìm"
                            v-model="search_name"
                        />
                        <button class="btn search-btn ms-auto" type="button">
                            <FontAwesomeIcon :icon="faSearch" />
                        </button>
                    </form>
                </div>
                <div class="ms-4">
                    <select class="form-select rounded-pill h-100 select-input" v-model="topic_id">
                        <option selected value="">Chọn chủ đề</option>
                        <option v-for="topic in topics" :value="topic._id">{{ topic.topic_name }}</option>
                    </select>
                </div>
            </div>

            <div v-if="isMounted">
                <h2 class="section-title">Sách mới</h2>
                <div class="row mt-3 justify-content-center new-book-list">
                    <div class="col col-md-2" v-for="book in newBooks" :key="book._id">
                        <BookCard :book="book" />
                    </div>
                </div>
            </div>
            <div v-if="isMounted">
                <h2 class="section-title">Dành cho bạn</h2>
                <div class="row mt-3">
                    <div class="col col-md-2" v-for="book in books" :key="book._id">
                        <BookCard :book="book" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.search-bar {
    width: 520px;
}
.search-input {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
}
.search-btn {
    border: none;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    color: var(--dark-text-color);
}
.select-input {
    font-size: 1.6rem;
    color: var(--dark-text-color);
    width: 300px;
}
</style>
