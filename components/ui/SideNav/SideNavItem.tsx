import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
    active?: boolean;
    subMenu?: any;
    disabled: boolean;
    external: boolean;
    icon?: JSX.Element;
    path: string;
    title: string;
    isList: boolean
    click?: () => void;
    activeMenus?: string[]
}

export const SideNavItem = ({active = false, disabled, external, icon, path, title, isList, activeMenus, click}: Props) => {

  const linkProps = isList ? path ? external ? 
      {
        component: 'a',
        href: path,
        target: '_blank'
      } : {
        component: NextLink,
        href: path
      } : {}
      : {}

  return (
    <>
      <li>
        <ButtonBase
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
           
          }}
          {...linkProps}
          onClick={click}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main'
                })
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              display: 'flex',
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.black'
              }),
              ...(disabled && {
                color: 'neutral.500'
              })
            }}
          >
            <span style={{minWidth: '100px'}}>
              {title}
            </span>
            {!isList && ( activeMenus?.includes(title) ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>) }
          </Box>
        </ButtonBase>
      </li>
    </>
  );
};

