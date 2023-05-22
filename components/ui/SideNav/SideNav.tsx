/* eslint-disable @next/next/no-img-element */
import {
  Drawer,
  useMediaQuery
} from '@mui/material';
import { SideContent } from './SideContent';

interface Props {
    onClose: () => void;
    direction?: boolean;
    sideWidth?: number;
    navHeight?: number;
    open: boolean;
    className?: any
}

export const SideNav = ({open, onClose, className, direction, sideWidth, navHeight }:Props) => {

  const lgMd = useMediaQuery((theme) => (theme as any).breakpoints.up('md'));

    const openStyled = {
        transition: 'transform 280ms ease',
        transform: 'translateX(0)'
    }

    const closeStyled = {
        transition: 'transform 280ms ease',
        transform: `translateX(-${sideWidth}px)`,
    }

    const classes = !lgMd ? {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    } : {
      ...(direction ? openStyled : closeStyled),
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100% - ${navHeight}px)`,
      width: `${sideWidth}px`,
    }

  if (lgMd) {
    return <SideContent className={className} classes={classes}/>
  }
  
  return (
    <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant="temporary"
      >
        <SideContent className={className} classes={classes}/>
      </Drawer>
  );
};
