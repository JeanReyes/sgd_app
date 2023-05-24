import React from 'react';
import Drawer from '@mui/material/Drawer';
import { SIDE_NAV_WIDTH } from '../../../utils/constants';
import { ConfigTheme } from '../../configTheme/ConfigTheme';
import { Card, CardHeader, Typography, CardContent, Divider, Grid, } from '@mui/material';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
    toggle: boolean;
    anchor: Anchor;
    title: string;
    handleSettings: () => void;
}

export const Settings = ({toggle, anchor, title, handleSettings}:  Props) => {

  const toggleDrawer =(anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) return;
      handleSettings()
  };
  

  return (
    <div>
        <Drawer
            anchor={anchor}
            open={toggle}
            onClose={toggleDrawer(anchor, !toggle)}
            PaperProps={{
              sx: {
                // backgroundColor: 'neutral.800',
                // color: 'common.white',
                width: `${200}px`
              }
            }}
        >
          <Card>
              <CardHeader
                title={title}
              />
               <Divider />
              <CardContent>
                <Grid sx={{display: 'flex', alignItems: 'center'}} container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>
                      theme:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <ConfigTheme from='nav'/>
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
        </Drawer>
    </div>
  );
}