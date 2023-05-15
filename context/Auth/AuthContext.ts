import { createContext } from "react";
import { User } from "../../interface/Auth";

interface ContextProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User;
    signIn: (email: string, password: string) => void
    signOut: () => void
}

export const AuthContext = createContext({} as ContextProps);