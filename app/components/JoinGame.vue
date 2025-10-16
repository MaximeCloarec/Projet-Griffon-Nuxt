<template>
    <UFieldGroup>
        <UInput
            color="neutral"
            variant="outline"
            placeholder="Entre code salle"
            size="xl"
            v-model="roomCode"
        />
        <UButton
            label="Rejoindre"
            color="secondary"
            size="xl"
            @click="joinGame"
        />
    </UFieldGroup>
</template>

<script lang="ts" setup>
const roomCode = ref();
const userStore = useUserStore()

const joinGame = async () => {
    try {
        const data = await $fetch<Game>(
            "http://localhost:3001/api/games/join",
            {
                method: "POST",
                body: {
                    userId: userStore.id,
                    roomCode: roomCode.value,
                },
            }
        );

        console.log(data);
    } catch (error: any) {
        console.error("Erreur de connexion :", error);
    }
};
</script>

<style></style>
