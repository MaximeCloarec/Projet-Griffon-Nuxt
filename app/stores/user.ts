import { defineStore } from "pinia";
import type { User, Game } from "@/utils/types";

export const useUserStore = defineStore("user", {
    state: () => ({
        id: null as number | null,
        email: "" as string,
        token: "" as string,
        createdAt: null as Date | null,
        createdGames: [] as Game[],
        joinedGames: [] as Game[],
    }),

    getters: {
        isLoggedIn: (state) => !!state.token,
    },

    actions: {
        setUser(token: string, user: User) {
            this.token = token;
            this.id = user.id;
            this.email = user.email;
            this.createdAt = user.createdAt;
            this.createdGames = user.createdGames || [];
            this.joinedGames = user.joinedGames || [];
        },

        logout() {
            this.$reset(); // plus propre que tout réinitialiser manuellement
        },
    },
});
