import { createTheme } from '@mui/material';
import { createPalette } from './config/light-theme/create-palette';
import { createComponents } from './config/light-theme/create-components';
import { createShadows } from './config/light-theme/create-shadows';
import { createTypography } from './config/light-theme/create-typography';

export const lightTheme = () => {
    const palette: Object = createPalette();
    const components: Object = createComponents({ palette });
    const shadows: any = createShadows();
    const typography: Object = createTypography();

    return createTheme({
        palette,
        components,
        shadows,
        typography
    })
}