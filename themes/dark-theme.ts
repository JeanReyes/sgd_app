import { createTheme } from '@mui/material';
import { red, purple, blue, yellow } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        background: {
            // default: red[500],
            // paper: red[500]
        },
        mode: 'dark',
            secondary: {
                main: yellow[100]
            },
            primary: {
                main: red[500],
            },
            error: {
                main: red.A400
            },
        },

        components: {
            MuiAppBar: {
                defaultProps: {
                    elevation: 0
                },
                styleOverrides: {
                    root: {
                        backgroundColor: '#001E3C'
                    }
                }
            },
            MuiCssBaseline: {
                styleOverrides: {
                  '*': {
                    boxSizing: 'border-box'
                  },
                  html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                  },
                  body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                  },
                  '#__next': {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%'
                  },
                  '#nprogress': {
                    pointerEvents: 'none'
                  },
                  '#nprogress .bar': {
                    backgroundColor: 'red',
                    height: 5,
                    left: 0,
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 2000
                  }
                }
            },
        }
});