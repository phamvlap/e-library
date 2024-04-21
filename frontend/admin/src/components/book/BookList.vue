<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faPen, faSearch, faAngleLeft, faAngleRight, faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';
import BookService from '@/services/book.service.js';
import TopicService from '@/services/topic.service.js';
import Helper from '@/utils/helper.js';

const router = useRouter();

let books = ref([]);
let topics = ref([]);
let releasedYears = ref([]);
let filter = ref({
    topic: '',
    released_year: '',
    name: '',
});

const getBooks = async (filter = {}) => {
    try {
        const customFilter = {};
        Object.keys(filter.value).map((key) => {
            if (filter.value[key] !== '') {
                customFilter[`book_${key}`] = filter.value[key];
            }
        });
        if (Object.hasOwnProperty.call(customFilter, 'book_released_year')) {
            customFilter.book_released_year = Number(customFilter.book_released_year);
        }
        const bookService = new BookService();
        const response = await bookService.getBooks(customFilter);
        if (response.status === 'success') {
            const data = response.data.map((book) => {
                return {
                    _id: book._id,
                    book_image: Helper.formatImageUrl(book.images[0].image_url),
                    book_name: book.book_name,
                    book_authors: book.book_authors,
                    book_topic: book.topic[0].topic_name,
                    book_quantity: book.book_quantity,
                    book_released_year: book.book_released_year,
                };
            });
            books.value = data;
        }
    } catch (error) {
        books.value = [];
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
        topics.value = [];
    }
};
const getReleasedYears = async () => {
    try {
        const bookService = new BookService();
        const response = await bookService.getReleasedYears();
        if (response.status === 'success') {
            releasedYears.value = response.data;
        }
    } catch (error) {
        releasedYears.value = [];
    }
};
const redirecToBookAdd = () => {
    router.push({
        name: 'book.add',
    });
};
const redirectToBookDetail = (id) => {
    router.push({
        name: 'book.detail',
        params: {
            id,
        },
    });
};
const redirectToBookModify = (id) => {
    router.push({
        name: 'book.edit',
        params: {
            id,
        },
    });
};
const handleFilter = async () => {
    filter.value.name = '';
    await getBooks(filter);
};
const submitSearchForm = async (event) => {
    event.preventDefault();

    filter.value.topic = '';
    filter.value.released_year = '';
    await getBooks(filter);
};
const handleRefresh = async () => {
    filter.value = {
        topic: '',
        released_year: '',
        name: '',
    };
    await getBooks(filter);
};
onMounted(async () => {
    await getBooks(filter);
    await getTopics();
    await getReleasedYears();
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách sách</h1>
        <div class="p-2">
            <button class="btn btn-outline-secondary" @click="redirecToBookAdd">
                <FontAwesomeIcon :icon="faPlus" />
                <span class="ms-2">Thêm sách mới</span>
            </button>
        </div>
        <div class="p-2 d-flex border justify-content-between align-items-center">
            <!-- filter -->
            <div class="d-flex">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="input-group m-0">
                        <label class="input-group-text label" for="select-topic">Chủ đề</label>
                        <select class="form-select" id="select-topic" v-model="filter.topic">
                            <option class="select-item" value="">-- Chọn --</option>
                            <option class="select-item" v-for="topic in topics" :value="topic._id" :key="topic._id">
                                {{ topic.topic_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="d-flex align-items-center ms-2">
                    <div class="input-group m-0">
                        <label class="input-group-text label" for="select-released-year">Năm phát hành</label>
                        <select class="form-select" id="select-released-year" v-model="filter.released_year">
                            <option class="select-item" value="">-- Chọn --</option>
                            <option class="select-item" v-for="year in releasedYears" :value="year" :key="year">
                                {{ year }}
                            </option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary ms-3" @click="handleFilter">Áp dụng</button>
            </div>
            <!-- search -->
            <div class="d-flex">
                <form class="input-group" @submit="submitSearchForm">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập tên sách cần tìm"
                        aria-describedby="search-book"
                        v-model="filter.name"
                    />
                    <button class="btn btn-outline-secondary" type="button" id="search-book">
                        <FontAwesomeIcon :icon="faSearch" />
                    </button>
                </form>
                <div class="ms-4">
                    <button class="btn btn-secondary" type="button" id="search-book" @click="handleRefresh">
                        <FontAwesomeIcon :icon="faRotate" />
                    </button>
                </div>
            </div>
        </div>
        <!-- table -->
        <table class="table table-striped table-hover border mt-2">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Các tác giả</th>
                    <th scope="col">Chủ đề</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Năm phát hành</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in books" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                        <img class="cell-image" :src="book.book_image" alt="" />
                    </td>
                    <td>{{ book.book_name }}</td>
                    <td>{{ book.book_authors }}</td>
                    <td>{{ book.book_topic }}</td>
                    <td>{{ book.book_quantity }}</td>
                    <td>{{ book.book_released_year }}</td>
                    <td>
                        <button class="btn btn-primary" @click="redirectToBookDetail(book._id)">
                            <FontAwesomeIcon :icon="faEye" />
                            <span class="ms-2">Chi tiết</span>
                        </button>
                        <button class="btn btn-warning ms-3" @click="redirectToBookModify(book._id)">
                            <FontAwesomeIcon :icon="faPen" />
                            <span class="ms-2">Hiệu chỉnh</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="mt-5">
            <ul class="pagination justify-content-end custom-pagination">
                <li class="page-item custom-pagination__item disabled">
                    <a class="page-link custom-pagination__link p-3">
                        <FontAwesomeIcon :icon="faAngleLeft" class="custom-pagination__icon" />
                    </a>
                </li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">1</a></li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">2</a></li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link custom-pagination__link p-3" href="#">
                        <FontAwesomeIcon :icon="faAngleRight" class="custom-pagination__icon" />
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
th,
td {
    color: var(--dark-text-color);
    padding: 8px;
}
.cell-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
}
th:last-child,
td:last-child {
    width: 280px;
}
.select {
    font-size: 1.6rem;
}
#select-topic,
#select-released-year,
.label,
.select-item {
    font-size: 1.6rem;
}
.custom-pagination__link {
    font-size: 1.6rem;
    color: var(--dark-text-color);
}
.custom-pagination__icon {
    font-size: 1.4rem;
}
</style>
