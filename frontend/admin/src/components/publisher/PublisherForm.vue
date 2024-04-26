<script setup>
import { ref, watch } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
    publisher: {
        type: Object,
        required: true,
    },
    isUpdating: {
        type: Boolean,
    },
});
const $emits = defineEmits(['submit:publisher']);
let localPublisher = ref({
    ...props.publisher,
});
const publisherSchema = yup.object().shape({
    publisher_name: yup
        .string()
        .required('Tên nhà xuất bản không được để trống')
        .min(2, 'Tên nhà xuất bản phải có ít nhất 2 ký tự'),
    publisher_address: yup
        .string()
        .required('Địa chỉ nhà xuất bản không được để trống')
        .min(2, 'Địa chỉ nhà xuất bản phải có ít nhất 2 ký tự'),
});
const handleSubmit = () => {
    $emits('submit:publisher', localPublisher.value);
};
watch(
    () => props.publisher,
    (newValue) => {
        localPublisher.value = {
            ...newValue,
        };
    },
);
</script>

<template>
    <Form @submit="handleSubmit" :validation-schema="publisherSchema">
        <div class="form-group mb-3">
            <label for="publisher_name">Tên nhà xuất bản:</label>
            <Field
                name="publisher_name"
                type="text"
                id="publisher_name"
                class="form-control mt-3"
                v-model="localPublisher.publisher_name"
            />
            <ErrorMessage name="publisher_name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publisher_address">Địa chỉ nhà xuất bản:</label>
            <Field
                name="publisher_address"
                type="text"
                id="publisher_address"
                class="form-control mt-3"
                v-model="localPublisher.publisher_address"
            />
            <ErrorMessage name="publisher_address" class="error-feedback" />
        </div>
        <div class="form-group mt-4 text-center">
            <button type="submit" class="btn btn-primary">
                {{ isUpdating ? 'Cập nhật' : 'Thêm mới' }}
            </button>
        </div>
    </Form>
</template>

<style scoped></style>
