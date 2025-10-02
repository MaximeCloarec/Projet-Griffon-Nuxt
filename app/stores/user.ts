import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        id: null as number | null,
        email: "" as string,
        token: "" as string,
        createdAt: null as Date | null,
        createdGames: [] as string[],
        joinedGames: [] as string[],
    }),

    getters: {
        isLoggedIn: (state) => !!state.token, // renvoie true si on a un token
    },

    actions: {
        setUser(
            token: string,
            user: { id: number; email: string; createdAt: Date }
        ) {
            this.token = token;
            this.id = user.id;
            this.email = user.email;
            this.createdAt = user.createdAt;
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
