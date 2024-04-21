<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Swal from 'sweetalert2';
import StaffRole from '@/enums/staffRoles.js';

const router = useRouter();
const props = defineProps({
    staff: {
        type: Object,
        required: true,
    },
    isUpdating: {
        type: Boolean,
        default: false,
    },
});
const staffRoles = StaffRole.getKeys();
const $emits = defineEmits(['submit:staff']);
let localStaff = ref({
    ...props.staff,
});
let errors = ref({
    staff_role: '',
});
let isMounted = ref(false);

watch(isMounted, (newValue) => {
    localStaff.value = {
        ...newValue,
    };
});

const staffSchema = yup.object().shape({
    staff_name: yup
        .string()
        .required('Tên nhân viên không được để trống')
        .min(3, 'Tên nhân viên phải có ít nhất 3 ký tự'),
    staff_address: yup.string().required('Địa chỉ không được để trống').min(3, 'Địa chỉ phải có ít nhất 3 ký tự'),
    staff_phone: yup
        .string()
        .required('Số điện thoại không được để trống')
        .min(10, 'Số điện thoại phải bao gồm 10 ký tự'),
});
const validateRole = () => {
    if (localStaff.value.staff_role === '') {
        errors.value.staff_role = 'Vai trò không được để trống';
    }
};
const submitStaff = () => {
    $emits('submit:staff', localStaff.value);
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
            router.push({
                name: 'staff.list',
            });
        }
    });
};
</script>

<template>
    <Form @submit="submitStaff" :validation-schema="staffSchema">
        <div class="mb-3 row">
            <label for="staff_name" class="col-sm-2 col-form-label">Tên nhân viên: </label>
            <div class="col-sm-10">
                <Field
                    type="text"
                    class="form-control"
                    id="staff_name"
                    name="staff_name"
                    v-model="localStaff.staff_name"
                    :disabled="isUpdating"
                />
                <ErrorMessage name="staff_name" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staff_role" class="col-sm-2 col-form-label">Vai trò: </label>
            <div class="col-sm-10">
                <select class="form-select select" name="staff_role" v-model="localStaff.staff_role">
                    <option disabled value="">-- Chọn --</option>
                    <option v-for="(role, index) in staffRoles" :value="role" :key="index">
                        {{ StaffRole.retrieveRole(role) }}
                    </option>
                </select>
                <span class="error-feedback">{{ errors.staff_role }}</span>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staff_address" class="col-sm-2 col-form-label">Địa chỉ: </label>
            <div class="col-sm-10">
                <Field
                    type="text"
                    class="form-control"
                    id="staff_address"
                    name="staff_address"
                    v-model="localStaff.staff_address"
                    :disabled="isUpdating"
                />
                <ErrorMessage name="staff_address" class="error-feedback" />
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staff_phone" class="col-sm-2 col-form-label">Số điện thoại: </label>
            <div class="col-sm-10">
                <Field
                    type="text"
                    class="form-control"
                    id="staff_phone"
                    name="staff_phone"
                    v-model="localStaff.staff_phone"
                    :disabled="isUpdating"
                />
                <ErrorMessage name="staff_phone" class="error-feedback" />
            </div>
        </div>
        <div class="text-center mt-3">
            <button type="button" class="btn btn-secondary" @click="handleCancel">Hủy</button>
            <button type="submit" class="btn btn-primary ms-3" @click="validateRole">
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
