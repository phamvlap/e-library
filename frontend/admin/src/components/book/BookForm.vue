<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
    book: {
        type: Object,
        // required: true,
    },
});
let localBook = ref({
    ...props.book,
});
const bookSchema = yup.object().shape({
    book_name: yup.string().required('Tên sách không được để trống').min(2, 'Tên sách phải có ít nhất 2 ký tự'),
    book_price: yup.number().required('Giá sách không được để trống').min(1000, 'Giá sách phải lớn hơn 1000'),
    book_quantity: yup.number().required('Số lượng sách không được để trống').min(1, 'Số lượng sách phải lớn hơn 0'),
    book_released_year: yup
        .number()
        .required('Năm xuất bản không được để trống')
        .min(1000, 'Năm xuất bản phải lớn hơn 1000')
        .max(new Date().getFullYear(), `Năm xuất bản không được lớn hơn năm hiện tại`),
    book_authors: yup.string().required('Tác giả không được để trống').min(2, 'Tác giả phải có ít nhất 2 ký tự'),
    book_description: yup.string().required('Mô tả không được để trống').min(10, 'Mô tả phải có ít nhất 10 ký tự'),
});
</script>

<template>
    <Form action="">
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
                        <select class="form-select select">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="topic_id" class="col-sm-2 col-form-label">Chủ đề: </label>
                    <div class="col-sm-10">
                        <select class="form-select select">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="book_description" class="col-sm-2 col-form-label">Mô tả: </label>
                    <div class="col-sm-10">
                        <textarea class="form-control textarea-input" id="book_description" rows="4"></textarea>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="mb-3 row">
                    <label for="book_images" class="col-sm-2 col-form-label">Hình ảnh: </label>
                    <div class="col-sm-10">
                        <Field
                            type="file"
                            class="form-control"
                            id="book_images"
                            name="book_images"
                            v-model="localBook.book_images"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-3">
            <button type="submit" class="btn btn-secondary">Hủy</button>
            <button type="submit" class="btn btn-primary ms-3">Thêm sách</button>
        </div>
    </Form>
</template>

<style scoped>
.select,
.textarea-input {
    font-size: 1.6rem;
}
</style>
