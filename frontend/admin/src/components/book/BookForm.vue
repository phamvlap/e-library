<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import PublisherService from '@/services/publisher.service.js';
import TopicService from '@/services/topic.service.js';
import Helper from '@/utils/helper.js';
import Swal from 'sweetalert2';

const router = useRouter();
const props = defineProps({
    book: {
        type: Object,
        required: true,
    },
    isUpdating: {
        type: Boolean,
        default: false,
    },
});
const $emits = defineEmits(['submit:book']);
let localBook = ref({
    ...props.book,
});
let publishers = ref([]);
let topics = ref([]);
let errors = ref({});
let uploadedImagesSrc = ref([]);
let uploadedImages = ref([]);

const bookSchema = yup.object().shape({
    book_name: yup.string().required('Tên sách không được để trống').min(2, 'Tên sách phải có ít nhất 2 ký tự'),
    book_price: yup
        .number()
        .typeError('Giá sách phải là số')
        .required('Giá sách không được để trống')
        .min(1000, 'Giá sách phải lớn hơn 1000'),
    book_quantity: yup
        .number()
        .typeError('Số lượng phải là số')
        .required('Số lượng không được để trống')
        .min(1, 'Số lượng phải lớn hơn 0'),
    book_released_year: yup
        .number()
        .typeError('Năm xuất bản phải là số')
        .required('Năm xuất bản không được để trống')
        .min(1000, 'Năm xuất bản phải lớn hơn 1000')
        .max(new Date().getFullYear(), 'Năm xuất bản không được lớn hơn năm hiện tại'),
    book_authors: yup.string().required('Tác giả không được để trống').min(2, 'Tác giả phải có ít nhất 2 ký tự'),
});

const validateNotTextType = () => {
    if (localBook.value.publisher_id === '') {
        errors.value.publisher_id = 'Nhà xuất bản không được để trống';
    } else {
        errors.value.publisher_id = '';
    }
    if (!localBook.value.topic_id) {
        errors.value.topic_id = 'Chủ đề không được để trống';
    } else {
        errors.value.topic_id = '';
    }
    if (!localBook.value.book_description) {
        errors.value.book_description = 'Mô tả không được để trống';
    } else {
        errors.value.book_description = '';
    }
    if (!localBook.value.uploaded_images.length > 0) {
        errors.value.uploaded_images = 'Hình ảnh không được để trống';
    } else {
        errors.value.uploaded_images = '';
    }
};
const handleUploadImages = (event) => {
    const imageList = [];
    for (let i = 0; i < event.target.files.length; i++) {
        imageList.push(event.target.files[i]);
    }
    uploadedImages.value = imageList;
    uploadedImagesSrc.value = imageList.map((image) => URL.createObjectURL(image));
};

const submitBook = () => {
    if (uploadedImages.value.length > 0) {
        localBook.value.uploaded_images = uploadedImages.value;
    }
    validateNotTextType();
    if(Object.values(errors.value).filter(error => error !== '').length > 0) {
        return;
    }
    console.log('submit', errors)
    $emits('submit:book', localBook.value);
};
const fetchPulishers = async () => {
    try {
        const publisherService = new PublisherService();
        const response = await publisherService.getPublishers();
        if (response.status === 'success') {
            publishers.value = response.data;
        }
    } catch (error) {
        publishers.value = [];
    }
};
const fetchTopics = async () => {
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
const handleCancel = () => {
    Swal.fire({
        title: 'Xác nhận hủy',
        text: 'Bạn có chắc chắn muốn hủy bỏ thao tác?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hủy',
        cancelButtonText: 'Không',
    }).then((result) => {
        if (result.isConfirmed) {
            router.push('/admin/books');
        }
    });
};

onMounted(async () => {
    await fetchPulishers();
    await fetchTopics();
    localBook.value = {
        ...props.book,
    };
});
</script>

<template>
    <Form @submit="submitBook" :validation-schema="bookSchema">
        <div class="row">
            <div class="col col-md-6">
                <div class="mb-3 row">
                    <label for="book_name" class="col-sm-2 col-form-label">Tên sách: </label>
                    <div class="col-sm-10">
                        <Field
                            type="text"
                            class="form-control"
                            id="book_name"
                            name="book_name"
                            v-model="localBook.book_name"
                        />
                        <ErrorMessage name="book_name" class="error-feedback" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="book_price" class="col-sm-2 col-form-label">Giá sách: </label>
                    <div class="col-sm-10">
                        <Field
                            type="text"
                            class="form-control"
                            id="book_price"
                            name="book_price"
                            v-model="localBook.book_price"
                        />
                        <ErrorMessage name="book_price" class="error-feedback" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="book_quantity" class="col-sm-2 col-form-label">Số lượng: </label>
                    <div class="col-sm-10">
                        <Field
                            type="text"
                            class="form-control"
                            id="book_quantity"
                            name="book_quantity"
                            v-model="localBook.book_quantity"
                        />
                        <ErrorMessage name="book_quantity" class="error-feedback" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="book_released_year" class="col-sm-2 col-form-label">Năm xuất bản: </label>
                    <div class="col-sm-10">
                        <Field
                            type="text"
                            class="form-control"
                            id="book_released_year"
                            name="book_released_year"
                            v-model="localBook.book_released_year"
                        />
                        <ErrorMessage name="book_released_year" class="error-feedback" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="book_authors" class="col-sm-2 col-form-label">Tác giả: </label>
                    <div class="col-sm-10">
                        <Field
                            type="text"
                            class="form-control"
                            id="book_authors"
                            name="book_authors"
                            v-model="localBook.book_authors"
                        />
                        <ErrorMessage name="book_authors" class="error-feedback" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="publisher_id" class="col-sm-2 col-form-label">Nhà xuất bản: </label>
                    <div class="col-sm-10">
                        <select class="form-select select" name="publisher_id" v-model="localBook.publisher_id">
                            <option disabled value="">-- Chọn --</option>
                            <option v-for="publisher in publishers" :value="publisher._id" :key="publisher._id">
                                {{ publisher.publisher_name }}
                            </option>
                        </select>
                        <span class="error-feedback">{{ errors.publisher_id }}</span>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="topic_id" class="col-sm-2 col-form-label">Chủ đề: </label>
                    <div class="col-sm-10">
                        <select class="form-select select" name="topic_id" v-model="localBook.topic_id">
                            <option disabled value="">-- Chọn --</option>
                            <option v-for="topic in topics" :value="topic._id" :key="topic._id">
                                {{ topic.topic_name }}
                            </option>
                        </select>
                        <span class="error-feedback">{{ errors.topic_id }}</span>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="book_description" class="col-sm-2 col-form-label">Mô tả: </label>
                    <div class="col-sm-10">
                        <textarea
                            as="textarea"
                            class="form-control textarea-input"
                            id="book_description"
                            name="book_description"
                            rows="4"
                            v-model="localBook.book_description"
                        ></textarea>
                        <span class="error-feedback">{{ errors.book_description }}</span>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="mb-3 row">
                    <label for="book_images" class="col-sm-2 col-form-label">Hình ảnh: </label>
                    <div class="col-sm-10">
                        <input
                            type="file"
                            class="form-control"
                            id="book_images"
                            name="book_images"
                            @change="handleUploadImages"
                            multiple
                        />
                        <span class="error-feedback">{{ errors.uploaded_images }}</span>
                    </div>
                    <div class="row" v-if="uploadedImagesSrc.length > 0">
                        <div class="col col-md-3 p-2" v-for="(imageSrc, index) in uploadedImagesSrc" :key="index">
                            <img class="image-item" :src="imageSrc" alt="" />
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="col col-md-3 p-2" v-for="image in book.book_images" :key="image._id">
                            <img class="image-item" :src="Helper.formatImageUrl(image.image_url)" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-3">
            <button type="button" class="btn btn-secondary" @click="handleCancel">Hủy</button>
            <button type="submit" class="btn btn-primary ms-3" @click="validateNotTextType">
                {{ isUpdating ? 'Hiệu chỉnh' : 'Thêm' }}
            </button>
        </div>
    </Form>
</template>

<style scoped>
.select,
.textarea-input {
    font-size: 1.6rem;
}
.image-item {
    width: 100%;
    height: 240px;
    object-fit: cover;
}
</style>
