import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../controller/authActions'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Avatar, Button, Container } from '@mui/material';
import Compte from './Compte';
import EditProfile from './EditProfile';
import LogoutIcon from '@mui/icons-material/Logout';
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

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const dispatch= useDispatch()
    const logout=()=>{
        dispatch(Logout())
    }
  return (
    <div>
        <Container>
        <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 ,marginTop:"30px"}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab  label="Profile" {...a11yProps(0)} />
        <Tab label="Edit Profile" {...a11yProps(1)} />
        <Tab label="Log out" {...a11yProps(2)} />
        
      </Tabs>
      <TabPanel value={value} index={0}>
        <Compte/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditProfile />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Button variant="outlined" color="error" onClick={logout} endIcon={<LogoutIcon />}>Log out</Button>
      </TabPanel>      
    </Box>
        </Container>
        <div>
            
        </div>

    </div>
  )
}

export default Profile