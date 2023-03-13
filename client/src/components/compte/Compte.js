import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

function stringToColor(string) {
  let hash = 0;
  let i;
  
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
function Compte() {
  const [user,setUser] =useState({}) 
  const [location, setLocation]=useState({})
  const auth=useSelector(state=>state.auth)
    const getProfile=async()=>{
      const data= await axios.get('http://localhost:8080/FarmerToConsumer/profile/'+auth.user.email)
      .catch((err)=>{if(err.status===401){
        window.location.reload()
      } }
      )
      setUser(data.data) 
      setLocation(data.data.location)
      //console.log(data.data.location) 
      console.log(location)
      return data
    }
    useEffect(() => {
        getProfile()
    }, [])  
  return (
    <div>
       <List
      sx={{
        width: '400px',
        maxWidth: 600,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
      <Avatar {...stringAvatar("Amani Baher")} sx={{ marginRight:"10px"}} />
        <ListItemText primary="Name" secondary={user.name} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Email" secondary={user.email} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Phone Number" secondary={user.phoneNumber} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Address" secondary={location.streetAddress+" "+location.city+" "+location.postalCode} />
        
      </ListItem>
     
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Description" secondary={user.description} />
      </ListItem>
      <Divider component="li" variant="inset" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 9 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
          
        </Typography>
      </li>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Role" secondary={user.role} />
      </ListItem>
    </List>
    </div>
    
  )
}

export default Compte