import { createContext } from "react";

interface ContextSgd {
    theme: string;
    company: string;
}

export const SgdContext = createContext({} as ContextSgd);