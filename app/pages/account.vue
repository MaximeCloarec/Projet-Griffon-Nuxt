<template>
    <UPage>
        <UPageGrid>
            <UContainer
                class="bg-gradient-to-b from-[#D9D9D999] from-[0%] to-[#121417FF] to-[70%]"
            >
                <UUser
                    orientation="vertical"
                    :name="userName"
                    alt="Avatar"
                    :avatar="{
                        src: 'https://i.pinimg.com/280x280_RS/d1/e4/0b/d1e40b4d011ad8156c149c903456b895.jpg',
                    }"
                    size="3xl"
                    class="items-center"
                />
            </UContainer>
            <UContainer class="lg:col-span-2">
                <NuxtImg src="/accountImage.png" class="rounded-[2vw]" />
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
