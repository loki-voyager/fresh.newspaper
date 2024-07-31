import { create } from "zustand";

type UserState = {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    Auth: boolean;
    role: string | null;
    setUsername: (username: string | null) => void;
    setFirstName: (first_name: string | null) => void;
    setLastName: (last_name: string | null) => void;
    setEmail: (email: string | null) => void;
    setRole: (role: string | null) => void;
    setAuth: (Auth: boolean) => void;
};

export const useUser = create<UserState>((set) => ({
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    Auth: false,
    role: null,
    setUsername: (username) => set((state) => ({ username })),
    setFirstName: (first_name) => set((state) => ({ first_name })),
    setLastName: (last_name) => set((state) => ({ last_name })),
    setEmail: (email) => set((state) => ({ email })),
    setRole: (role) => set((state) => ({ role })),
    setAuth: (Auth) => set((state) => ({ Auth })),
}));




