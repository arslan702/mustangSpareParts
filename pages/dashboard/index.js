import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import AccountPopover from '../../Components/AccountPopover';
import { mainListItems } from '../../Components/listItems';
// import { useRouter } from 'next/router';
import LoginPage from '../login';
// import React, { useEffect } from 'react';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme?.zIndex?.drawer + 1,
  backgroundColor: 'white',

  // boxShadow: 'none',
  boxShadow: 'rgba(0, 0, 0, 0.1) 4px 4px 12px',

  // borderRadius:'20px',
 
  transition: theme?.transitions?.create(['width', 'margin'], {
    easing: theme?.transitions?.easing?.sharp,
    duration: theme?.transitions?.duration?.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme?.transitions?.create(['width', 'margin'], {
      easing: theme?.transitions?.easing?.sharp,
      duration: theme?.transitions?.duration?.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      backgroundColor: 'white',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      width: drawerWidth,
      transition: theme?.transitions?.create('width', {
        easing: theme?.transitions?.easing?.sharp,
        duration: theme?.transitions?.duration?.enteringScreen,
      }),
     
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme?.transitions?.create('width', {
          easing: theme?.transitions?.easing?.sharp,
          duration: theme?.transitions?.duration?.leavingScreen,
        }),
        width: theme?.spacing(7),
        [theme?.breakpoints?.up('sm')]: {
          width: theme?.spacing(9),
        },
      }),
    },
    '& .MuiTypography-root': {
      color:'gray',
      fontFamily:'Open Sans',
      fontSize:'17px', 
      fontWeight:'400',
  },

  }),
);

const mdTheme = createTheme();

function Dashboard({value, children}) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // const router = useRouter();

  if(value == undefined) {
    return (
      <LoginPage/>
    )
  } else {
    return (
      <div>
            <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              justifyContent: 'space-between'
            }}
          >
            <IconButton
              edge="start"
              color="default"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                padding: '4px',
                // ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography
              color="#707070"
              sx={{
                display: 'flex',
                marginRight: '20px',
                fontFamily:'Open Sans',
                fontSize:'17px',
              }}
            >
              {/* <AccessTimeIcon style={{marginRight:'10px'}}/>{' '} */}
              {/* {moment().format("MMM Do, h:mm a")} */}
            </Typography>
            <AccountPopover/>
           </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p:1,
            }}
          >
            
            {/* <img src={finalLogo} height={60} alt='Logo' /> */}

            <h2>Auto Parts</h2>
          </Toolbar>
          <List component="nav">
            {mainListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {children}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
      </div>
    )
  }
}

export default Dashboard

Dashboard.getLayout = function PageLayout(page) {
  return (
    <>{page}</>
  )
}