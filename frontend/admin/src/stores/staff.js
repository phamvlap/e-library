import { ref } from 'vue';
import { defineStore } from 'pinia';
import AccountService from '@/services/account.service.js';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

export const useStaffStore = defineStore('staff', () => {
    const router = useRouter();
    let staff = ref(null);

    function isAuth() {
        return staff.value !== null;
    }

    async function login(data) {
        try {
            const accountService = new AccountService();
            const response = await accountService.login(data);
            if (response.status === 'success') {
                staff.value = {
                    ...response.data.data,
                };
                localStorage.setItem('staff-is-logged-in', true);
                localStorage.setItem('staff-token', response.data.token);
                toast.success('Đăng nhập thành công', {
                    duration: 1500,
                    onClose: () => {
                        router.push({
                            name: 'home',
                        });
                    },
                });
            } else {
                throw new Error('Đăng nhập thất bại');
            }
        } catch (error) {
            staff.value = null;
            localStorage.removeItem('staff-is-logged-in');
            localStorage.removeItem('staff-token');
            toast.error(error.message, {
                duration: 1500,
            });
        }
    }

    async function getMe() {
        try {
            const accountService = new AccountService();
            const response = await accountService.getMe();
            if (response.status === 'success') {
                staff.value = {
                    ...response.data.data,
                };
            } else {
                throw new Error('Không thể lấy thông tin tài khoản');
            }
        } catch (error) {
            staff.value = null;
            localStorage.removeItem('staff-is-logged-in');
            localStorage.removeItem('staff-token');
            toast.error(error.message, {
                duration: 1500,
            });
        }
    }

    async function logout() {
        staff.value = null;
        localStorage.removeItem('staff-is-logged-in');
        localStorage.removeItem('staff-token');
        toast.success('Đăng xuất thành công', {
            duration: 1500,
            onClose: () => {
                router.push({
                    name: 'home',
                });
            },
        });
    }

    return {
        staff,
        isAuth,
        login,
        getMe,
        logout,
    };
});
