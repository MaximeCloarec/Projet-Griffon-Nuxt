<template>
    <USeparator label="Connexion" />
    <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 ls"
        @submit="login"
    >
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
import type { FormError } from "@nuxt/ui";
import type { LoginResponse } from "@/utils/types";

const toast = useToast();
const userStore = useUserStore();

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const state = reactive({
    email: "",
    password: "",
});

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.email) errors.push({ name: "email", message: "Required" });
    if (!state.password) errors.push({ name: "password", message: "Required" });
    if (state.email && !regexEmail.test(state.email))
        errors.push({ name: "email", message: "Invalid email Format" });
    return errors;
};

const login = async () => {
    try {
        const data = await $fetch<LoginResponse>(
            "http://localhost:3001/api/users/login",
            {
                method: "POST",
                body: {
                    email: state.email,
                    password: state.password,
                },
            }
        );
        userStore.setUser(data.token, data.user);
        toast.add({
            title: "Succès",
            description: `${data.message}`,
            color: "success",
        });
        await navigateTo("/account");
    } catch (error: any) {
        toast.add({
            title: "Erreur",
            description: `Impossible de se connecter (${
                error?.status || "??"
            })`,
            color: "error",
        });
        console.error("Erreur de connexion :", error);
    }
};
</script>
