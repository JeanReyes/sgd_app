import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { createPalette } from './config/create-palette';
import { createComponents } from './config/create-components';
import { createShadows } from './config/create-shadows';
import { createTypography } from './config/create-typography';

export const lightTheme = () => {
    const palette: Object = createPalette();
    const components: Object = createComponents({ palette });
    const shadows: any = createShadows();
    const typography: Object = createTypography();

    return createTheme({
        // palette: {
        //     ...palette,
        //     mode: 'light',
        //     background: {
        //         default: grey[300]
        //     },
        //     primary: {
        //         main: '#4a148c'
        //     },
        //     secondary: {
        //         main: '#19857b'
        //     },
        //     error: {
        //         main: red.A400
        //     },
        // },
        palette,
        components,
        shadows,
        typography
    })
}