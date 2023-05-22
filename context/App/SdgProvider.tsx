import React, { useEffect, useReducer } from 'react';
import { SgdContext } from './SgdContext';
import { SgdReducer } from './sgdReducer';

export interface SgdState {
    theme: string  
}

const SGD_INITIAL_APP: SgdState = {
    theme: 'light'
}

interface Props {
    children: JSX.Element;
    company: string
}

export const SgdProvider = ({ children, company }: Props) => {

    const [ state, dispatch ] = useReducer(SgdReducer, SGD_INITIAL_APP);

    useEffect(() => {

    }, [])

    return (
        <SgdContext.Provider value={{
            theme: 'light',
            company,
        }}>
            {children}
        </SgdContext.Provider>
    )
}

export const SgdConsumer = SgdContext.Consumer;
