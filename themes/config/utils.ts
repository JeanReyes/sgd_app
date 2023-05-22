import { ClassNameMap, makeStyles } from '@mui/styles';

// crear factory para las classes

export const sideLight = makeStyles({
    root: {
      height: '100%',
      color: 'black',
      borderRight: '1px solid'
    },
});
export const sideDark = makeStyles({
  root: {
    backgroundColor: '#001E3C',
    height: '100%',
    color: 'white'
  },
});

