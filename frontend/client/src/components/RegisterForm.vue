<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Helper from '@/utils/helper.js';
import Swal from 'sweetalert2';
import Gender from '@/enums/gender.js';

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
});
let errors = ref({});

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
    reader_password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    reader_confirm_password: yup
        .string()
        .required('Nhập lại mật khẩu không được để trống')
        .oneOf([yup.ref('reader_password'), null], 'Mật khẩu không khớp'),
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
    if (Object.keys(errors.value).length > 0) {
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
            router.push('/admin/readers');
        }
    });
};

onMounted(async () => {});
</script>

<template>
    <Form @submit="submitReader" :validation-schema="readerSchema">
        <div class="mb-3">
            <label for="reader_first_name" class="col-form-label">Họ độc giả: </label>
            <div>
                <Field
                    type="text"
                    class="form-control"
                    id="reader_first_name"
                    name="reader_first_name"
                    v-model="localReader.reader_first_name"
                />
                <ErrorMessage name="reader_first_name" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3">
            <label for="reader_last_name" class="col-form-label">Tên độc giả: </label>
            <div>
                <Field
                    type="text"
                    class="form-control"
                    id="reader_last_name"
                    name="reader_last_name"
                    v-model="localReader.reader_last_name"
                />
                <ErrorMessage name="reader_last_name" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3">
            <label for="reader_dob" class="col-form-label">Ngày sinh: </label>
            <div>
                <input
                    type="date"
                    class="form-control"
                    id="reader_dob"
                    name="reader_dob"
                    v-model="localReader.reader_dob"
                />
                <span class="error-feedback">{{ errors.reader_dob }}</span>
            </div>
        </div>
        <div class="mb-3">
            <label for="reader_gender" class="col-form-label">Giới tính: </label>
            <div>
                <select class="form-select select" name="reader_gender" v-model="localReader.reader_gender">
                    <option disabled value="">-- Chọn --</option>
                    <option v-for="(item, index) in Gender.getKeys()" :value="item" :key="index">
                        {{ Gender.retrieveGender(item) }}
                    </option>
                </select>
                <span class="error-feedback">{{ errors.reader_gender }}</span>
            </div>
        </div>
        <div class="mb-3">
            <label for="reader_address" class="col-form-label">Địa chỉ: </label>
            <div>
                <Field
                    type="text"
                    class="form-control"
                    id="reader_address"
                    name="reader_address"
                    v-model="localReader.reader_address"
                />
                <ErrorMessage name="reader_address" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3">
            <label for="reader_phone" class="col-form-label">Số điện thoại: </label>
            <div>
                <Field
                    type="text"
                    class="form-control"
                    id="reader_phone"
                    name="reader_phone"
                    v-model="localReader.reader_phone"
                />
                <ErrorMessage name="reader_phone" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3">
            <label for="reader_password" class="col-form-label">Mật khẩu: </label>
            <div>
                <Field
                    type="password"
                    class="form-control"
                    id="reader_password"
                    name="reader_password"
                    v-model="localReader.reader_password"
                />
                <ErrorMessage name="reader_password" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3">
            <label for="reader_confirm_password" class="col-form-label">Nhập lại mật khẩu: </label>
            <div>
                <Field
                    type="password"
                    class="form-control"
                    id="reader_confirm_password"
                    name="reader_confirm_password"
                    v-model="localReader.reader_confirm_password"
                />
                <ErrorMessage name="reader_confirm_password" class="error-feedback" />
            </div>
        </div>
        <div class="mb-4">
            <p>
                Bạn đã có tài khoản?
                <RouterLink
                    :to="{
                        name: 'login',
                    }"
                    class="link"
                >
                    Đăng nhập ngay
                </RouterLink>
            </p>
        </div>
        <div class="text-center mt-5">
            <button type="submit" class="btn btn-info ms-3" @click="validateDobAndGender">Đăng ký</button>
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
