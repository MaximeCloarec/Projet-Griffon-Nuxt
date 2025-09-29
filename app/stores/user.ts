import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        id: null as number | null,
        email: "" as string,
        token: "" as string, // on stocke le JWT renvoyé par le backend
        createdGames: [] as string[],
        joinedGames: [] as string[],
    }),

    getters: {
        isLoggedIn: (state) => !!state.token, // renvoie true si on a un token
    },

    actions: {
        setUser(user: { id: number; email: string; token: string }) {
            this.id = user.id;
            this.email = user.email;
            this.token = user.token;
        },

        logout() {
            this.id = null;
            this.email = "";
            this.token = "";
            this.createdGames = [];
            this.joinedGames = [];
        },
    },
});
