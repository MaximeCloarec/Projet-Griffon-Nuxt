<template>
    <USeparator label="Connexion" />
    <UForm :validate="validate" :state="state" class="space-y-4 ls" @submit="login">
        <UFormField label="Email" name="email">
            <UInput
                placeholder="Entrez votre email"
                class="w-full"
                v-model="state.email"
            />
        </UFormField>
        <UFormField label="Mot de passe" name="password">
            <UInput
                placeholder="Entrez votre mot de passe"
                class="w-full"
                v-model="state.password"
                type="password"
            />
        </UFormField>
        <UButton type="submit"> Submit </UButton>
    </UForm>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const state = reactive({
    nickname: undefined,
    email: undefined,
    password: undefined,
});

const validate = (state: any): FormError[] => {
    const errors = [];
    // Check if fields are empty
    if (!state.email) errors.push({ name: "email", message: "Required" });
    if (!state.password) errors.push({ name: "password", message: "Required" });

    //Check email format
    if (state.email && !regexEmail.test(state.email))
        errors.push({ name: "email", message: "Invalid email Format" });
    return errors;
};

const login = async () => {
    const { data, error, pending } = await useFetch("http://192.168.1.28/api/user/login", {
        method: "POST",
        body: {
            email: state.email,
            password: state.password,
        },
    });

    if (error.value) {
        console.error("Erreur de connexion :", error.value);
    } else {
        console.log("Utilisateur connecté :", data.value, pending.value);
    }
};
</script>
