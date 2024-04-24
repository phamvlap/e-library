<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
    account: {
        type: Object,
        required: true,
    },
});
const $emits = defineEmits(['submit:staff-login']);
let localAccount = ref({
    ...props.account,
});
const accountSchema = yup.object().shape({
    account_id: yup
        .string()
        .required('Mã số cán bộ không được để trống')
        .min(2, 'Mã số cán bộ phải có ít nhất 2 ký tự'),
    account_password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});
const handleSubmitLogin = () => {
    $emits('submit:staff-login', localAccount.value);
};
</script>

<template>
    <Form @submit="handleSubmitLogin" :validation-schema="accountSchema">
        <div class="form-group">
            <label for="account_id">Mã số cán bộ:</label>
            <Field
                name="account_id"
                type="text"
                id="account_id"
                class="form-control"
                v-model="localAccount.account_id"
            />
            <ErrorMessage name="account_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="account_password">Mật khẩu:</label>
            <Field
                name="account_password"
                type="password"
                id="account_password"
                class="form-control"
                v-model="localAccount.account_password"
            />
            <ErrorMessage name="account_password" class="error-feedback" />
        </div>
        <div class="form-group mt-4 text-center">
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </div>
    </Form>
</template>

<style scoped>
@import './../assets/css/form.css';
</style>
