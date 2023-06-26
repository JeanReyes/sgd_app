import { CacheProvider, ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { darkTheme, lightTheme } from '../themes'
import { CssBaseline } from '@mui/material'
import { AuthProvider, AuthConsumer } from '../context/Auth/AuthProvider'
import { createEmotionCache } from '../utils/create-emotion-react'
import { useProgress } from '../hooks/useProgress'
import 'simplebar-react/dist/simplebar.min.css';
import '../styles/globals.css'
import { SgdConsumer, SgdProvider } from '../context/App/SdgProvider'

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

export default function App({ Component, pageProps }: AppProps) {
    // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    
    useProgress();

    const AnyComponent = Component as any;

    return (
        <CacheProvider value={clientSideEmotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <AuthProvider>
                <SgdProvider company={'san-clemente'}>
                    <SgdConsumer>
                        {
                            ({theme}) => (
                                <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                                    <CssBaseline/>
                                    <AuthConsumer>
                                        {
                                            ({isLoading}) => isLoading
                                            ? <>Cargando...</>
                                            : <AnyComponent {...pageProps} />
                                        }
                                    </AuthConsumer>
                                </ThemeProvider>
                            )
                        }
                    </SgdConsumer>
                </SgdProvider>
            </AuthProvider>
        </CacheProvider>
    )
}
