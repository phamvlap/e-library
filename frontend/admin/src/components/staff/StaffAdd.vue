<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import StaffForm from './StaffForm.vue';
import StaffService from '@/services/staff.service.js';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const staffId = route.params.id;
const isUpdating = !!staffId;
const isMounted = ref(false);

let staff = ref({
    staff_name: '',
    staff_role: '',
    staff_address: '',
    staff_phone: '',
});

const submitStaff = async (data) => {
    try {
        const staffService = new StaffService();
        if (isUpdating) {
            await staffService.updateStaff(staffId, data);
            toast.success('Cập nhật nhân viên thành công', {
                duration: 2500,
                onClose: () => {
                    router.push({
                        name: 'staff.list',
                    });
                },
            });
        } else {
            const response = await staffService.createStaff(data);
            if(response.status === 'success') {
                const account = response.data.account;
                Swal.fire({
                    title: 'Tạo tài khoản thành công',
                    html: `<div>
                        <h2>Tài khoản của nhân viên mới vừa được tạo</h2>
                        <br>Mã nhân viên: <b>${account.account_id}</b><br>Mật khẩu: <b>${account.account_password}</b></div>`,
                    icon: 'success',
                    confirmButtonText: 'Đóng',
                }).then((result) => {
                    if(result.isConfirmed) {
                        router.push({
                            name: 'staff.list',
                        });
                    }
                })
            }
        }
    } catch (error) {
        toast.error(`${isUpdating ? 'Cập nhật' : 'Thêm'} nhân viên thất bại`, {
            duration: 2500,
        });
    }
};
const getOneStaff = async (id) => {
    try {
        const staffService = new StaffService();
        const response = await staffService.getStaff(id);
        if (response.status === 'success') {
            const data = response.data;
            staff.value = {
                staff_name: data.staff_name,
                staff_role: data.staff_role,
                staff_address: data.staff_address,
                staff_phone: data.staff_phone,
            };
        }
    } catch (error) {
        staff.value = {};
    }
};

onMounted(async () => {
    if (staffId) {
        await getOneStaff(staffId);
    }
    isMounted.value = true;
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">
            {{ isUpdating ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới' }}
        </h1>
        <div class="p-2">
            <RouterLink
                :to="{
                    name: 'staff.list',
                }"
                class="btn btn-outline-secondary btn-back"
            >
                <FontAwesomeIcon :icon="faChevronLeft" />
                <span class="ms-2">Quay lại</span>
            </RouterLink>
        </div>
        <!-- form -->
        <div class="p-2">
            <div class="row">
                <div class="col col-md-6 offset-md-3">
                    <StaffForm v-if="isMounted" :staff="staff" :isUpdating="isUpdating" @submit:staff="submitStaff" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-back {
    font-size: 1.6rem;
}
</style>
