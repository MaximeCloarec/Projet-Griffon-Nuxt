<template>
    <div class="cardContainer">
        <CardIndex
            title="Devenez un maitre du jeu"
            description="Libérez votre créativité et créez des expériences de
                            jeu inoubliables. Créez vos propres mondes,
                            histoires et défis, et invitez les joueurs à se
                            lancer dans des aventures épiques."
            buttonText="Créez une partie"
            bgImage="/bgGameMaster.jpg"
            borderColor="#0d80f2"
        />

        <CardIndex
            title="Rejoindre comme joueur"
            description="Plongez dans des jeux palpitants créés par de
                            talentueux maitre du jeu. Saisissez un code de lobby
                            pour rejoindre une aventure continue et échanger
                            avec d'autres joueurs."
            bgImage="/bgPlayer.webp"
            borderColor="#ffc404"
        >
            <template #extra>
                    <UFieldGroup >
                        <UInput color="neutral" variant="outline" placeholder="Entre code salle" size="xl" />
                        <UButton label="Rejoindre" color="secondary" size="xl"/>
                    </UFieldGroup>
            </template>
        </CardIndex>
    </div>
</template>

<script></script>

<style scoped>
.cardContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
}

/* .inputContainer {
    display: flex;
    background-color: white;
    width: fit-content;
    border-radius: 20px;
} */

.inputPlayer {
    color: black;
    border-radius: 20px;
    padding: 20px;
    outline: 0;
}
</style>
