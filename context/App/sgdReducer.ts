import { SgdState } from "./SdgProvider"

export type SgdAction = 
| { type: 'set-theme', payload: string }



export const SgdReducer = (state: SgdState, action: SgdAction ): SgdState => {
    const { type } = action
    if(type === 'set-theme'){
        return {
            ...state,
            theme: action.payload
        }
    }

    return state
}