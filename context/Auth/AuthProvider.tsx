import React, { useEffect, useReducer, useRef } from 'react'
import { AuthContext } from './AuthContext'
import { useAuth } from '../../hooks/useContext';
import { User } from '../../interface/Auth';
import { AuthReducer } from './AuthReducer';

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean
    user: User
    
}

const SGD_INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    user: {} as User
}

interface Props {
    children: JSX.Element;
}

export const AuthProvider = ({children}: Props) => {

    const [ stateAuth, dispatch ] = useReducer( AuthReducer, SGD_INITIAL_STATE );
    const initialized = useRef(false);
    const loged = useRef((typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('authenticated') as string) : null) !== null ? true : false)

    const initialize = async () => {    

        // Prevent from calling twice in development mode with React.StrictMode enabled
        if (initialized.current) {
            return;
        }
    
        initialized.current = true;
    
        let isAuthenticated = false;
        
        try {
            isAuthenticated = window.localStorage.getItem('authenticated') === 'true';
        } catch (err) {
            console.error(err);
        }
 

        if (isAuthenticated) {
            //aqui hacer la autenticacion
            const user: User = {
                id: '5e86809283e28b96d2d38537',
                avatar: '/avatar-anika-visser.png',
                name: 'Jean Reyes',
                email: 'SGD.jereyes@NES.cl'
            };

            dispatch({
                type: 'init-login',
                payload: user
            });
        }  else {
            dispatch({
              type:'init-login',
            });
          }
    };

    const signIn = async (email: string, password: string) => {
        // metodo de login ir a BD y traer user
        if (email !== 'SGD.jereyes@NES.cl' || password !== 'Password123!') {
            throw new Error('Please check your email and password');
        }
    
        try {
            window.localStorage.setItem('authenticated', 'true');
        } catch (err) {
            console.error(err);
        }
    
        const user: User = {
            id: '5e86809283e28b96d2d38537',
            avatar: '/avatar-anika-visser.png',
            name: 'Jean Reyes',
            email: 'SGD.jereyes@NES.cl'
        };

        dispatch({
            type: 'sign-in',
            payload: user
          });
    };

    const signOut = () => {
        window.localStorage.removeItem('authenticated')
        dispatch({
          type: 'sing-out'
        });
    };

    useEffect(() => {    
        initialize()
    }, [])


    return (
        <AuthContext.Provider value={{
            ...stateAuth,
            signIn,
            signOut,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const AuthConsumer = AuthContext.Consumer;
