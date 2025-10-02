<template>
    <UPage>
        <UPageGrid>
            <UContainer>
                <UUser
                    orientation="vertical"
                    :name="userName"
                    alt="Avatar"
                    :avatar="{
                        src: 'https://i.pinimg.com/280x280_RS/d1/e4/0b/d1e40b4d011ad8156c149c903456b895.jpg',
                    }"
                />
            </UContainer>
            <UContainer class="lg:col-span-2">
                <NuxtImg src="/accountImage.png" />
            </UContainer>
        </UPageGrid>
    </UPage>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: "auth",
});

const userStore = useUserStore();

const userName = ref(userStore.email);
</script>

<style></style>
