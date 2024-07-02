import { createContext } from "react";
import { User } from "../../interface/Auth";
import { ResisterProps } from "./AuthProvider";

interface ContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  signIn: (rut: string, password: string) => void;
  signOut: () => void;
  resisterUser: (data: ResisterProps) => void;
}

export const AuthContext = createContext({} as ContextProps);
