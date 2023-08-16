/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { SIDE_NAV_WIDTH } from '../../../utils/constants';
import { ConfigTheme } from '../../configTheme/ConfigTheme';
import { Card, CardHeader, CardContent, Typography, Divider, Grid, } from '@mui/material';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface DrawerBaseMethods {
  handleSettings: () => void;
}

interface Props {
    anchor: Anchor;
    title: string;
    width: string;
    children: JSX.Element
}

export const BaseDrawer =  forwardRef<DrawerBaseMethods, Props>(({ children, anchor, title, width }, ref) => {

  const [toggle, setToggle] = useState(false);

  const toggleDrawer =(anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) return;
      handleSettings()
  };

    
  const handleSettings = () => {
    setToggle(!toggle)
  }

  useImperativeHandle(ref, () => ({
    handleSettings
  }))


  return (
    <div>
        <Drawer
            anchor={anchor}
            open={toggle}
            onClose={toggleDrawer(anchor, !toggle)}
            PaperProps={{
              sx: {
                width: `${width}px`
              }
            }}
        >
          <Card>
              <CardHeader
                title={title}
              />
               <Divider />
              <CardContent>
                    {children}
              </CardContent>
          </Card>
        </Drawer>
    </div>
  );
})