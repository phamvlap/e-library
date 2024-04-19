<script setup>
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faPen, faSearch, faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const router = useRouter();
const redirecToBookAdd = () => {
    router.push({
        name: 'book.add',
    });
};

const redirectToBookDetail = (id) => {
    router.push({
        name: 'book.detail',
        params: {
            id,
        },
    });
};
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách sách</h1>
        <div class="p-2">
            <button class="btn btn-outline-secondary" @click="redirecToBookAdd">
                <FontAwesomeIcon :icon="faPlus" />
                <span class="ms-2">Thêm sách mới</span>
            </button>
        </div>
        <div class="p-2 d-flex border justify-content-between align-items-center">
            <!-- filter -->
            <div class="d-flex">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="input-group m-0">
                        <label class="input-group-text label" for="select-topic">Chủ đề</label>
                        <select class="form-select" id="select-topic">
                            <option class="select-item" selected>-- Chọn --</option>
                            <option class="select-item" value="1">One</option>
                            <option class="select-item" value="2">Two</option>
                            <option class="select-item" value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex align-items-center ms-2">
                    <div class="input-group m-0">
                        <label class="input-group-text label" for="select-topic">Năm phát hành</label>
                        <select class="form-select" id="select-topic">
                            <option class="select-item" selected>-- Chọn --</option>
                            <option class="select-item" value="1">One</option>
                            <option class="select-item" value="2">Two</option>
                            <option class="select-item" value="3">Three</option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary ms-3">Áp dụng</button>
            </div>
            <!-- search -->
            <div>
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập tên sách cần tìm"
                        aria-describedby="search-book"
                    />
                    <button class="btn btn-outline-secondary" type="button" id="search-book">
                        <FontAwesomeIcon :icon="faSearch" />
                    </button>
                </div>
            </div>
        </div>
        <!-- table -->
        <table class="table table-striped table-hover border mt-2">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Các tác giả</th>
                    <th scope="col">Chủ đề</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Năm phát hành</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>
                        <img class="cell-image" src="@/assets/images/truyen_kieu_1.jpeg" alt="" />
                    </td>
                    <td>Truyện kiều</td>
                    <td>Nguyễn Du</td>
                    <td>Văn học</td>
                    <td>10</td>
                    <td>1820</td>
                    <td>
                        <button class="btn btn-primary" @click="redirectToBookDetail(10)">
                            <FontAwesomeIcon :icon="faEye" />
                            <span class="ms-2">Chi tiết</span>
                        </button>
                        <button class="btn btn-warning ms-3">
                            <FontAwesomeIcon :icon="faPen" />
                            <span class="ms-2">Hiệu chỉnh</span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">1</th>
                    <td>
                        <img class="cell-image" src="@/assets/images/truyen_kieu_1.jpeg" alt="" />
                    </td>
                    <td>Truyện kiều</td>
                    <td>Nguyễn Du</td>
                    <td>Văn học</td>
                    <td>10</td>
                    <td>1820</td>
                    <td>
                        <button class="btn btn-primary" @click="redirectToBookDetail(20)">
                            <FontAwesomeIcon :icon="faEye" />
                            <span class="ms-2">Chi tiết</span>
                        </button>
                        <button class="btn btn-warning ms-3">
                            <FontAwesomeIcon :icon="faPen" />
                            <span class="ms-2">Hiệu chỉnh</span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row">1</th>
                    <td>
                        <img class="cell-image" src="@/assets/images/truyen_kieu_1.jpeg" alt="" />
                    </td>
                    <td>Truyện kiều</td>
                    <td>Nguyễn Du</td>
                    <td>Văn học</td>
                    <td>10</td>
                    <td>1820</td>
                    <td>
                        <button class="btn btn-primary" @click="redirectToBookDetail(30)">
                            <FontAwesomeIcon :icon="faEye" />
                            <span class="ms-2">Chi tiết</span>
                        </button>
                        <button class="btn btn-warning ms-3">
                            <FontAwesomeIcon :icon="faPen" />
                            <span class="ms-2">Hiệu chỉnh</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="mt-5">
            <ul class="pagination justify-content-end custom-pagination">
                <li class="page-item custom-pagination__item disabled">
                    <a class="page-link custom-pagination__link p-3">
                        <FontAwesomeIcon :icon="faAngleLeft" class="custom-pagination__icon" />
                    </a>
                </li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">1</a></li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">2</a></li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link custom-pagination__link p-3" href="#">
                        <FontAwesomeIcon :icon="faAngleRight" class="custom-pagination__icon" />
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
th,
td {
    color: var(--dark-text-color);
    padding: 8px;
}
.cell-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
}
th:last-child,
td:last-child {
    width: 280px;
}
.select {
    font-size: 1.6rem;
}
#select-topic,
.label,
.select-item {
    font-size: 1.6rem;
}
.custom-pagination__link {
    font-size: 1.6rem;
    color: var(--dark-text-color);
}
.custom-pagination__icon {
    font-size: 1.4rem;
}
</style>
