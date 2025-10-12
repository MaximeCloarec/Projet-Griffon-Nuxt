<template>
    <USeparator label="Inscription" />
    <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 ls"
        @submit="registerUser"
    >
        <!-- <UFormField label="Pseudo" name="nickname">
            <UInput
                placeholder="Entrez votre pseudo"
                class="w-full"
                v-model="state.nickname"
            />
        </UFormField> -->
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
    // nickname: undefined,
    email: undefined,
    password: undefined,
});

const validate = (state: any): FormError[] => {
    const errors = [];
    // Check if fields are empty
    if (!state.email) errors.push({ name: "email", message: "Required" });
    if (!state.password) errors.push({ name: "password", message: "Required" });
    // if (!state.nickname) errors.push({ name: "nickname", message: "Required" });

    //Check email format
    if (state.email && !regexEmail.test(state.email))
        errors.push({ name: "email", message: "Invalid email Format" });

    //Check password strength and format
    if (state.password && state.password.length < 8)
        errors.push({ name: "password", message: "Minimum 8 caractères" });
    if (state.password && !/[A-Z]/.test(state.password))
        errors.push({ name: "password", message: "Au moins une majuscule" });
    if (state.password && !/\d/.test(state.password))
        errors.push({ name: "password", message: "Au moins un chiffre" });
    return errors;
};

const toast = useToast();

async function registerUser() {
    try {
        const response = await $fetch.raw(
            "http://localhost:3001/api/users/register",
            {
                method: "POST",
                body: { email: state.email, password: state.password },
            }
        );

        // Vérifie le code status
        if (response.status === 201) {
            toast.add({
                title: "Succès",
                description: `Votre compte ${state.email} a été créé avec succès !`,
                color: "success",
            });

            // Réinitialiser les champs après succès
            state.email = undefined;
            state.password = undefined;
        } else {
            toast.add({
                title: "Erreur",
                description: `Impossible de créer le compte. Code: ${response.status}`,
                color: "error",
            });
        }
    } catch (error: any) {
        // Si backend renvoie une erreur JSON, tu peux la lire
        const message = error?.data?.message || "Une erreur est survenue";
        toast.add({
            title: "Erreur",
            description: message,
            color: "error",
        });
    }
}
</script>
