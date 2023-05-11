import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function NavBar({user}) {



  return (
    <AppBar
    position="static"
   
    elevation={0}
    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`,height:44, backgroundColor:"#263238" }}
  >
    <Toolbar sx={{ flexWrap: 'wrap',marginTop:{ xs: -2.5, sm: -3, md: -3 },marginLeft: { xs: '-28px', sm: '20px', md: '120px' },
 }}>
        <Link
          className='navBar1'
          to={'/'}
        >
          Home
        </Link>
        <Link
          color="text.primary"
          to={'/AboutUs'}
          className='navBar1'
        >
          About us
        </Link>
        <Link
          color="text.primary"
          to={'/Blog'}
          className='navBar1'
        >
          Blog
        </Link>
        <Link
          color="text.primary"
          to={'/ContactUs'}
          className='navBar1'
        >
          Contact us
        </Link>
        <Box sx={{marginTop:{ xs: -0.5, sm: -1, md: -1 },marginLeft: { xs: '-10px', sm: '20px', md: 100 }}}>

        {user === 'FARMER' ? (
          <Link to="/farmer" color="text.primary" className='navBar1' > 
                I'am a farmer
              </Link>
            
            ) : (
              ""
              )}
              </Box>
        
    </Toolbar>
  </AppBar>
  );
}