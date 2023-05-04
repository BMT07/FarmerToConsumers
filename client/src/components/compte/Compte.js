import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import AgricultureRoundedIcon from '@mui/icons-material/AgricultureRounded';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';



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
  const [user, setUser] = useState({})
  const [location, setLocation] = useState({})
  // const auth = useSelector(state => state.auth)
  const getProfile = async () => {
    const data = await axios.get('http://localhost:8080/FarmerToConsumer/profile/',{
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    })
      .catch((err) => {
        // if (err.response.status === 401) {
        //   window.location.reload()
        // }
        console.log(err)
      }
      )
    setUser(data.data)
    setLocation(data.data.location)
    console.log(location)
    return data
  }
  useEffect(() => {
    getProfile()
  }, [])
  return (
    <Grid columns={{ xs: 4, sm: 8, md: 10 }}>
      <List
        sx={{
          width: 260,
          maxWidth: 600,
          bgcolor: 'background.paper',
          marginTop:-3
        }}
      >
        <ListItem>
          <ListItemText primary="Name" secondary={user.name} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
        <EmailIcon sx={{marginRight:2}}/>
          <ListItemText primary="Email" secondary={user.email} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
        <LocalPhoneIcon sx={{marginRight:2}}/>
          <ListItemText primary="Phone Number" secondary={user.phoneNumber} />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <HomeIcon sx={{marginRight:2}}/>
          <ListItemText primary="Address" secondary={location.streetAddress + " " + location.city + " " + location.postalCode} />
        </ListItem>

        <Divider component="li" />
        <ListItem>
          <DescriptionIcon sx={{marginRight:2}}/>
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
          {
            user.role==="RESTAURANT" &&(
              <ListItemAvatar>
              <Avatar>
                <RestaurantTwoToneIcon />
              </Avatar>
            </ListItemAvatar>
            )}{
            user.role==="FARMER" &&(
              <ListItemAvatar>
              <Avatar>
                <AgricultureRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            )
          }
         
          <ListItemText primary="Role" secondary={user.role} />
        </ListItem>
      </List>
      
    </Grid>

  )
}

export default Compte