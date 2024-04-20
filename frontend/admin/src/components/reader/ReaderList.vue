<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faSearch, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách độc giả</h1>
        <div class="p-2 d-flex border justify-content-between align-items-center">
            <!-- filter -->
            <div class="d-flex"></div>
            <!-- search -->
            <div>
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập tên độc giả cần tìm"
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
                    <th scope="col">Mã độc giả</th>
                    <th scope="col">Họ</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Ngày sinh</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>R1001</td>
                    <td>Nguyen</td>
                    <td>An</td>
                    <td>01-01-2002</td>
                    <td>Nam</td>
                    <td>Can Tho</td>
                    <td>C03333385950</td>
                    <td>
                        <button class="btn btn-warning ms-3">
                            <FontAwesomeIcon :icon="faTrash" />
                            <span class="ms-2">Xóa</span>
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
    width: 200px;
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
