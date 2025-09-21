<template>
    <div class="mainContainer">
        <div class="heroContainer">
            <h1>Rejoinez le Projet Griffon</h1>
        </div>
        <div class="inscriptionContainer">
            <InscriptionForm />
        </div>
    </div>
</template>

<script></script>
<style scoped>
.mainContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-family: UnifrakturMaguntia;
    font-size: 8em;
    margin: 10px;
}

.heroContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
            0.12turn,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.4)
        ),
        url("../../public/backgroundConnexion.png");

    border-radius: 20px;
    background-position: center;
    background-size: cover;
    height: 500px;
    width: 75%;
    margin: 5vw;
}
</style>
