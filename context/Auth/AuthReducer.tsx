import { AuthState } from "./AuthProvider"
import { User } from "../../interface/Auth"

export type AuthAction = 
| { type: 'init-login', payload?: User }
| { type: 'sign-in', payload: User }
| { type: 'sing-out' }

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => { 
    const { type } = action
    if(type === 'init-login') {
        return {
            ...state,
            ...(
                // if payload (user) is provided, then is authenticated
                action.payload
                  ? ({
                    isLoading: false,
                    isAuthenticated: true,
                    user: action.payload
                  })
                  : ({
                    isLoading: false
                  })
              )
            
        }
    }
    if (type === 'sign-in') {
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload
        };
    }

    if (type === 'sing-out') {
        return {
            ...state,
            isAuthenticated: false,
            user: {} as User
          };
    }
    return state
}