<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Helper from '@/utils/helper.js';
import Swal from 'sweetalert2';
import Gender from '@/enums/gender.js';

const route = useRoute();
const router = useRouter();
const props = defineProps({
    reader: {
        type: Object,
        required: true,
    },
    isUpdating: {
        type: Boolean,
        default: false,
    },
});
const $emits = defineEmits(['submit:reader']);
let localReader = ref({
    ...props.reader,
    reader_dob: Helper.formatDateStandard(props.reader.reader_dob),
});
let errors = ref({});
let isUpdating = ref(props.isUpdating);

const readerSchema = yup.object().shape({
    reader_first_name: yup
        .string()
        .required('Họ độc giả không được để trống')
        .min(2, 'Họ độc giả phải có ít nhất 2 ký tự'),
    reader_last_name: yup
        .string()
        .required('Tên độc giả không được để trống')
        .min(2, 'Tên độc giả phải có ít nhất 2 ký tự'),
    reader_address: yup.string().required('Địa chỉ không được để trống').min(2, 'Địa chỉ phải có ít nhất 2 ký tự'),
    reader_phone: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ'),
});
const validateDobAndGender = () => {
    if (localReader.value.reader_dob === '') {
        errors.value.reader_dob = 'Ngày sinh không được để trống';
    } else {
        const dob = new Date(localReader.value.reader_dob);
        const now = new Date();
        if (dob >= now) {
            errors.value.reader_dob = 'Ngày sinh không hợp lệ';
        } else {
            errors.value.reader_dob = '';
        }
    }
    if (localReader.value.reader_gender === '') {
        errors.value.reader_gender = 'Giới tính không được để trống';
    } else {
        errors.value.reader_gender = '';
    }
};
const submitReader = () => {
    validateDobAndGender();
    if (Object.values(errors.value).filter((value) => value !== '').length > 0) {
        return;
    }
    $emits('submit:reader', localReader.value);
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
            router.go(0);
        }
    });
};

watch(
    () => props.isUpdating,
    (value) => {
        isUpdating.value = value;
    },
);

onMounted(async () => {});
</script>

<template>
    <Form @submit="submitReader" :validation-schema="readerSchema">
        <div class="mb-3 row">
            <label for="reader_first_name" class="col col-md-2 col-form-label">Họ: </label>
            <div class="col col-md-10">
                <Field
                    type="text"
                    class="form-control"
                    id="reader_first_name"
                    name="reader_first_name"
                    v-model="localReader.reader_first_name"
                    :disabled="!isUpdating"
                />
                <ErrorMessage name="reader_first_name" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3 row">
            <label for="reader_last_name" class="col col-md-2 col-form-label">Tên: </label>
            <div class="col col-md-10">
                <Field
                    type="text"
                    class="form-control"
                    id="reader_last_name"
                    name="reader_last_name"
                    v-model="localReader.reader_last_name"
                    :disabled="!isUpdating"
                />
                <ErrorMessage name="reader_last_name" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3 row">
            <label for="reader_dob" class="col col-md-2 col-form-label">Ngày sinh: </label>
            <div class="col col-md-10">
                <input
                    type="date"
                    class="form-control"
                    id="reader_dob"
                    name="reader_dob"
                    v-model="localReader.reader_dob"
                    :disabled="!isUpdating"
                />
                <span class="error-feedback">{{ errors.reader_dob }}</span>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="reader_gender" class="col col-md-2 col-form-label">Giới tính: </label>
            <div class="col col-md-10">
                <select
                    class="form-select select"
                    name="reader_gender"
                    v-model="localReader.reader_gender"
                    :disabled="!isUpdating"
                >
                    <option disabled value="">-- Chọn --</option>
                    <option v-for="(item, index) in Gender.getKeys()" :value="item" :key="index">
                        {{ Gender.retrieveGender(item) }}
                    </option>
                </select>
                <span class="error-feedback">{{ errors.reader_gender }}</span>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="reader_address" class="col col-md-2 col-form-label">Địa chỉ: </label>
            <div class="col col-md-10">
                <Field
                    type="text"
                    class="form-control"
                    id="reader_address"
                    name="reader_address"
                    v-model="localReader.reader_address"
                    :disabled="!isUpdating"
                />
                <ErrorMessage name="reader_address" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3 row">
            <label for="reader_phone" class="col col-md-2 col-form-label">Số điện thoại: </label>
            <div class="col col-md-10">
                <Field
                    type="text"
                    class="form-control"
                    id="reader_phone"
                    name="reader_phone"
                    v-model="localReader.reader_phone"
                    :disabled="!isUpdating"
                />
                <ErrorMessage name="reader_phone" class="error-feedback" />
            </div>
        </div>
        <div class="text-center mt-5">
            <button v-if="isUpdating" type="button" class="btn btn-secondary ms-3" @click="handleCancel">Hủy</button>
            <button v-if="isUpdating" type="submit" class="btn btn-info ms-3" @click="validateDobAndGender">Lưu</button>
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
