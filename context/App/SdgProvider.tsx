import React, { useEffect, useReducer } from 'react';
import { SgdContext } from './SgdContext';
import { SgdReducer } from './sgdReducer';
import { ThemeSgd } from '../../interface/Auth';

export interface SgdState {
    theme: ThemeSgd;
    settingApp: boolean;
    openNav: boolean
}

const SGD_INITIAL_APP: SgdState = {
    theme: 'light',
    settingApp: false,
    openNav: false
}

interface Props {
    children: JSX.Element;
    company: string
}

export const SgdProvider = ({ children, company }: Props) => {
    const currentTheme = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('theme') as string) : null;
    const [ state, dispatch ] = useReducer(SgdReducer, SGD_INITIAL_APP);
    const { theme } = state;

    const handleSetTheme = (value: ThemeSgd) => {
        window.localStorage.setItem('theme', JSON.stringify(value))
        dispatch({type: 'set-theme', payload: value});
    }
    const handleSettingApp = (value: boolean) => {
        dispatch({type: 'set-toggle', payload: value});
    }
    const handleSideNav = (openNav: boolean) => {
        dispatch({type: 'change-sideNav', payload: openNav})
    }

    useEffect(() => {
        if(currentTheme) {
            dispatch({type: 'set-theme', payload: currentTheme})
        }
    },[theme]);

    return (
        <SgdContext.Provider value={{
            ...state,
            company,
            handleSetTheme,
            handleSettingApp,
            handleSideNav
        }}>
            {children}
        </SgdContext.Provider>
    )
}

export const SgdConsumer = SgdContext.Consumer;
