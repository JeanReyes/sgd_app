import { ThemeSgd } from "../../interface/Auth"
import { SgdState } from "./SdgProvider"

export type SgdAction = 
| { type: 'set-theme', payload: ThemeSgd }
| { type: 'set-toggle', payload: boolean }
| { type: 'change-sideNav', payload: boolean }

export const SgdReducer = (state: SgdState, action: SgdAction ): SgdState => {
    const { type } = action
    if(type === 'set-theme'){
        return {
            ...state,
            theme: action.payload
        }
    }

    if(type === 'set-toggle') {
        return {
            ...state,
            settingApp: action.payload
        }
    }

    if(type === 'change-sideNav') {
        return {
            ...state,
            openNav: action.payload
        }
    }
    return state
}