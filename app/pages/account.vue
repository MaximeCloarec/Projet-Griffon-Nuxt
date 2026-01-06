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
                <UButton @click="deleteAccount">Supprimer Compte</UButton>
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
                            <JoinGame :userId="userId" />
                            <UContainer fluid class="m-8">
                                <div v-for="game in userJoinedGames" :key="game.id">
                                    {{ game }}
                                    <NuxtLink :to="{name: 'game-roomCode', params: {roomCode: game.roomCode}}">Go to Game</NuxtLink>
                                </div>
                            </UContainer>
                        </template>
                        <template #créée>
                            <UContainer fluid class="m-8">
                                <UBlogPosts orientation="vertical">
                                    <Games
                                        v-for="game in userStore.createdGames"
                                        :date="game.createdAt"
                                        :title="game.roomCode"
                                        :description="game.description"
                                        :link="game.roomCode"
                                    >
                                    </Games>
                                </UBlogPosts>
                                <UButton @click="createGame"
                                    >Créer une partie</UButton
                                >
                            </UContainer>
                        </template>
                    </UTabs>
                </UContainer>
            </UContainer>
        </UPageGrid>
    </UPage>
</template>

<script lang="ts" setup>
const joinRoomCode = ref();

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

const userId = ref(userStore.id);
const userName = ref(userStore.email);
const userCreatedGames = ref(userStore.createdGames);
const userJoinedGames = ref(userStore.joinedGames);

const deleteAccount = async () => {
    try {
        await $fetch(`http://localhost:3001/api/users/me`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${userStore.token}`,
            },
        });
        userStore.logout();
        await navigateTo("/connexion");
    } catch (error) {
        console.error("Error deleting account:", error);
    }
};

const createGame = async () => {
    try {
        await $fetch(`http://localhost:3001/api/games/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userStore.token}`,
            },
            body: {
                userId: userStore.id,
            },
        });
    } catch (error) {
        console.error("Error creating game:", error);
    }
};
</script>

<style></style>
