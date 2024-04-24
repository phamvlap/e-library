<script setup></script>
<template>
    <div class="p-3">
        <div class="container">
            <div class="d-flex justify-content-center footer">
                <p>
                    &copy; 2024 by
                    <RouterLink
                        :to="{
                            name: 'home',
                        }"
                    >
                        <strong>E-LIBRARY</strong>
                    </RouterLink>
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.footer {
    color: var(--first-level-color);
}
</style>
