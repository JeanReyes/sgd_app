import { THEMES } from "./contants"

export interface User {
    id: string,
    avatar: string,
    name: string,
    email: string
}

export type ThemeSgd = 'light' | 'dark'