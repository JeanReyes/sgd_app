import { IconButton, SxProps, Theme, useTheme } from '@mui/material';
import {useContext} from 'react'
import { SgdContext } from '../../context/App/SgdContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { grey  } from '@mui/material/colors';

interface Props {
    from: string;
    sx?: SxProps<Theme>
}

export const ConfigTheme = ({from, sx}: Props) => {
  
    const { theme, handleSetTheme } = useContext(SgdContext);
    const currentTheme = useTheme();
    const isLight = theme === 'light'

    const handleConfig = () => {
        
        if(theme === 'dark'){
           return handleSetTheme('light')
        }
        handleSetTheme('dark')

    }
    return (
        <>
            <IconButton
                onClick={handleConfig}
                size="small"
                sx={{
                    ...sx,
                    border: `0.5px solid ${isLight ? grey[500] : grey[700]}`
                }}
            >
                { 
                    isLight
                    ? <DarkModeIcon color="secondary"/>
                    : <LightModeIcon color="secondary"/>
                }
            </IconButton>
        </>
    )
}
