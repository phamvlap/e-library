<script setup>
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faPen, faSearch, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const router = useRouter();
const goToBorrowingDetail = (reader_id, book_id, returned_date) => {
    router.push({
        name: 'borrowing.detail',
        params: {
            reader_id,
            book_id,
            returned_date,
        },
    });
};
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách mượn trả</h1>
        <div class="p-2 d-flex border justify-content-between align-items-center">
            <!-- filter -->
            <div class="d-flex">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="input-group m-0">
                        <label class="input-group-text label" for="select-status">Trạng thái:</label>
                        <select class="form-select" id="select-status">
                            <option class="select-item" selected>-- Chọn --</option>
                            <option class="select-item" value="1">One</option>
                            <option class="select-item" value="2">Two</option>
                            <option class="select-item" value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex align-items-center ms-2">
                    <div class="input-group m-0">
                        <div class="input-group m-0">
                            <label class="input-group-text label">Ngày bắt đầu:</label>
                            <input type="date" class="border p-2" />
                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-center ms-2">
                    <div class="input-group m-0">
                        <label class="input-group-text label">Ngày kết thúc:</label>
                        <input type="date" class="border p-2" />
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
                    <th scope="col">Độc giả</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Ngày mượn</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Nguyen Van A</td>
                    <td>Truyện kiều</td>
                    <td>10:10 18-04-2024</td>
                    <td>10</td>
                    <td>Đang chờ duyệt</td>
                    <td>
                        <button class="btn btn-primary" @click="goToBorrowingDetail(1001, 1002, '10:10 18-04-2024<')">
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
                    <td>Nguyen Van A</td>
                    <td>Truyện kiều</td>
                    <td>10:10 18-04-2024</td>
                    <td>10</td>
                    <td>Đang chờ duyệt</td>
                    <td>
                        <button class="btn btn-primary" @click="goToBorrowingDetail(1001, 1002, '10:10 18-04-2024<')">
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
                    <td>Nguyen Van A</td>
                    <td>Truyện kiều</td>
                    <td>10:10 18-04-2024</td>
                    <td>10</td>
                    <td>Đang chờ duyệt</td>
                    <td>
                        <button class="btn btn-primary" @click="goToBorrowingDetail(1001, 1002, '10:10 18-04-2024<')">
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
#select-status,
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
