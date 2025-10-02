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

interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: number;
        email: string;
        createdAt: Date;
    };
}

const toast = useToast();

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

    //Check email format
    if (state.email && !regexEmail.test(state.email))
        errors.push({ name: "email", message: "Invalid email Format" });
    return errors;
};

const login = async () => {
    const userStore = useUserStore();
    const { data, error, pending } = await useFetch<LoginResponse>(
        "http://localhost:3000/api/login",
        {
            method: "POST",
            body: {
                email: state.email,
                password: state.password,
            },
        }
    );

    if (error.value) {
        toast.add({
            title: "Erreur",
            description: `Impossible de créer le compte. Code: ${error.value}`,
            color: "error",
        });
        console.error("Erreur de connexion :", error.value);
    }
    if (data.value) {
        toast.add({
            title: "Succès",
            description: `${data.value?.message}`,
            color: "success",
        });
        userStore.setUser(data.value?.token, data.value?.user);
        console.log("Utilisateur connecté :", data.value, pending.value);
        setTimeout(async () => await navigateTo("/account"), 2000);
    }
};
</script>
