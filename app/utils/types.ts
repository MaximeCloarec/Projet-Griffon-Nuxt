export interface Game {
    id: number;
    creatorId: number;
    roomCode: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    creator: User;
    players: User[];
}

export interface User {
    id: number;
    email: string;
    createdAt: Date;
    createdGames: Game[];
    joinedGames: Game[];
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}
