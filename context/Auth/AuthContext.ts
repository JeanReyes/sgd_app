import { createContext } from "react";
import { IRegister, User } from "../../interface/Auth";

interface ContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as ContextProps);
