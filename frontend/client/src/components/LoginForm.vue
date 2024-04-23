<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Swal from 'sweetalert2';

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
    reader_id: yup.string().required('Mã độc giả không được để trống'),
    reader_password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
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
            <label for="reader_id" class="col-form-label">Mã độc giả: </label>
            <div>
                <Field
                    type="text"
                    class="form-control"
                    id="reader_id"
                    name="reader_id"
                    v-model="localReader.reader_id"
                />
                <ErrorMessage name="reader_id" class="error-feedback" />
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
        <div class="mb-4">
            <p>
                Bạn chưa có tài khoản?
                <RouterLink
                    :to="{
                        name: 'register',
                    }"
                    class="link"
                >
                    Đăng ký ngay</RouterLink
                >
            </p>
        </div>
        <div class="text-center mt-5">
            <button type="submit" class="btn btn-info ms-3" @click="validateDobAndGender">Đăng nhập</button>
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
