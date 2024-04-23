import { ref } from 'vue';
import { defineStore } from 'pinia';
import AccountService from '@/services/account.service';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

export const useReaderStore = defineStore('reader', () => {
    const router = useRouter();
    let reader = ref(null);

    async function login(data) {
        try {
            const accountService = new AccountService();
            const response = await accountService.login(data);
            if (response.status === 'success') {
                reader.value = {
                    ...response.data.data,
                };
                console.log(reader.value);
                localStorage.setItem('reader-is-logged-in', true);
                localStorage.setItem('reader-token', response.data.token);
                toast.success('Đăng nhập thành công.', {
                    duration: 1500,
                    onClose() {
                        router.push({
                            name: 'home',
                        });
                    },
                });
            } else {
                throw new Error('Thông tin đăng nhập không chính xác.');
            }
        } catch (error) {
            reader.value = null;
            localStorage.removeItem('reader-is-logged-in');
            localStorage.removeItem('reader-token');
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
                reader.value = {
                    ...response.data.data,
                };
            } else {
                throw new Error('Lỗi không xác định.');
            }
        } catch (error) {
            reader.value = null;
            localStorage.removeItem('reader-is-logged-in');
            localStorage.removeItem('reader-token');
            toast.error(error.message, {
                duration: 1500,
            });
        }
    }

    async function logout() {
        reader.value = null;
        localStorage.removeItem('reader-is-logged-in');
        localStorage.removeItem('reader-token');
        toast.success('Đăng xuất thành công.', {
            duration: 1500,
            onClose() {
                router.push({
                    name: 'home',
                });
            },
        });
    }

    return { reader, getMe, login, logout };
});
