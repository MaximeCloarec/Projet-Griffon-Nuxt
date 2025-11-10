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
const props = defineProps<{
    userId: number | null;
}>();

const roomCode = ref("");
const userStore = useUserStore();
const toast = useToast();

const joinGame = async () => {
    // Vérifie si l'utilisateur est connecté
    const id = props.userId;

    if (!id) {
        toast.add({
            title: "Connexion requise",
            description: "Vous devez être connecté pour rejoindre une partie.",
            color: "warning",
        });
        await navigateTo("/connexion");
        return;
    }

    if (!roomCode.value) {
        toast.add({
            title: "Code manquant",
            description: "Veuillez entrer un code de salle.",
            color: "error",
        });
        return;
    }

    try {
        const data = await $fetch<Game>(
            "http://localhost:3001/api/games/join",
            {
                method: "POST",
                body: {
                    userId: id,
                    roomCode: roomCode.value,
                },
            }
        );

        toast.add({
            title: "Succès",
            description: `Vous avez rejoint la partie ${data.name}.`,
            color: "success",
        });

        // Redirige vers la page de la partie
        await navigateTo(`/game/${data.roomCode}`);
    } catch (error: any) {
        toast.add({
            title: "Erreur",
            description:
                error.data.message || "Impossible de rejoindre la partie.",
            color: "error",
        });
    }
};
</script>
