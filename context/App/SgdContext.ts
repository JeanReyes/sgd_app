import { createContext } from "react";
import { ThemeSgd } from "../../interface/Auth";

interface ContextSgd {
    theme: ThemeSgd;
    settingApp: boolean;
    company: string;
    handleSetTheme: (value: ThemeSgd) => void;
    handleSettingApp: (value: boolean) => void;
}

export const SgdContext = createContext({} as ContextSgd);