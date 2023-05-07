import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../controller/authActions'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Avatar, Breadcrumbs, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from '@mui/material';
import Compte from './Compte';
import EditProfile from './EditProfile';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { height } from '@mui/system';
import { Link } from 'react-router-dom';
import Newsletter from '../home/newsletter/Newsletter';
import MyOrders from './MyOrders';
const channel = new BroadcastChannel('auth');

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function Profile() {
  const [value, setValue] = React.useState(0);
  const auth = useSelector((state) => state.auth);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch()
  const logout = () => {
    channel.postMessage('logout');

    channel.addEventListener('message', (event) => {
      if (event.data === 'logout') {
        dispatch(Logout())
        window.location.href = '/login'
      }
    });
  }
  const StyledCard = styled(Card)(({ theme }) => ({
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    maxHeight:700

    
  }));
  return (
    <>
   
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 10 }}>
      <Grid item xs={4}>
      <StyledCard>
      <CardHeader
        avatar={<Avatar aria-label="user" />}
        title={auth.user.name}
        subheader={auth.user.email}
      />
      {auth.user.role==="FARMER"?
      (<CardMedia
        component="img"
        height="194"
        image={require('../assets/images/farmer.png')}
        alt="Farmer"
        />):(
          <CardMedia
        component="img"
        height="194"
        image={require('../assets/images/restaurant.png')}
        alt="RESTAURANT_MANAGER"
        />
      )}
      {auth.user.role==="FARMER"?
      (<CardContent>
        Description :
        <Typography mt={2} variant="body2" color="text.secondary">
        At our website, we're dedicated to supporting local 
        farmers and providing our customers with the freshest 
        and most delicious farm products possible. That's why 
        we offer an online marketplace where farmers can showcase
        and sell their products directly to consumers. 
        Our platform makes it easy for farmers to set up their own
         online store, where they can list their products, set prices,
        and manage orders and deliveries
        </Typography>
      </CardContent>):
       (<CardContent>
        Description :
        <Typography mt={2} variant="body2" color="text.secondary">
        Welcome to our online farm store! Here, you can browse 
        and purchase our selection of fresh, locally grown produce,
         meats, dairy, and other farm products, all from the comfort
          of your own home. We offer a wide range of options to suit 
          all tastes and preferences, from organic vegetables and free-range
           eggs to grass-fed beef and artisanal cheeses. With our easy-to-use online
            ordering system, you can select the products you want, choose your delivery
             or pickup option, and securely pay using a variety of payment methods. 
        </Typography>
      </CardContent>)}
    </StyledCard>
      </Grid>

      <Grid item xs={6}>
        <Container>
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', maxHeight: 2000, marginTop: "30px",boxShadow:2  }}
            >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
              >
              <Tab label="Profile" {...a11yProps(0)} />
              <Tab label="Edit Profile" {...a11yProps(1)} />
              <Tab label="My orders" {...a11yProps(2)} />
              <Tab label="Log out" {...a11yProps(3)} />

            </Tabs>
            <TabPanel value={value} index={0}>
              <Compte />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <EditProfile />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MyOrders />
            </TabPanel>
            
            <TabPanel value={value} index={3}>
            <div>
            You have been logged out of the website. See you soon!
              </div>
            
              <Button style={{marginTop:10}} variant="outlined" color="error" onClick={logout} endIcon={<LogoutIcon />}>Log out</Button>
            </TabPanel>
          </Box>
        </Container>
      </Grid>

    </Grid>
    <Newsletter/>
              </>
  )
}

export default Profile