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
                <NuxtImg
                    src="/accountImage.png"
                    class="rounded-[2vw] w-6xl h-96"
                />
                <UContainer>
                    <UTabs
                        :items="items"
                        variant="pill"
                        size="md"
                        class="gap-4 w-full"
                    >
                        <template #rejointe>
                            <UContainer fluid class="m-8"
                                >{{ userJoinedGames }}
                            </UContainer>
                        </template>
                        <template #créée>
                            <UContainer fluid class="m-8">
                                <UBlogPosts orientation="vertical">
                                    <Games
                                        v-for="game in userStore.createdGames"
                                        :date="game.createdAt"
                                        :title="game.name"
                                        :description="game.description"
                                        :link="game.roomCode"
                                    >
                                    </Games>
                                </UBlogPosts>
                            </UContainer>
                        </template>
                    </UTabs>
                </UContainer>
            </UContainer>
        </UPageGrid>
    </UPage>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: "auth",
});

const items = [
    {
        label: "Partie rejointe",
        slot: "rejointe" as const,
    },
    {
        label: "Partie créée",
        slot: "créée" as const,
    },
];

const userStore = useUserStore();

const userName = ref(userStore.email);
const userCreatedGames = ref(userStore.createdGames);
const userJoinedGames = ref(userStore.joinedGames);
</script>

<style></style>
