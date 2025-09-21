<template>
    <h2>Inscription</h2>
    <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 ls"
        @submit="onSubmit"
    >
        <UFormField label="Pseudo" name="nickname">
            <UInput
                placeholder="Entrez votre pseudo"
                class="w-full"
                v-model="state.nickname"
            />
        </UFormField>
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
    if (!state.nickname) errors.push({ name: "nickname", message: "Required" });

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
function onSubmit(event: FormSubmitEvent<typeof state>) {
    toast.add({
        title: "Success",
        description: `Votre compte ${state.nickname} a été créé avec succès !`,
        color: "success",
    })
}
</script>
