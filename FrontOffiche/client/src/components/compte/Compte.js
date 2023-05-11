import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import AgricultureRoundedIcon from '@mui/icons-material/AgricultureRounded';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
const images = [
  {
    label: 'Hello our new farmer, to visit your interface please click here ..',
    imgPath:
      require("../assets/images/1.PNG"),
  },
  {
    label: 'Please feel free to select any button from the menu below by clicking on it.',
    imgPath:
    require("../assets/images/2.PNG"),
  },
  {
    label: 'To add a product, you must fill out the fields in the form provided.',
    imgPath:
    require("../assets/images/3.PNG"),
  },
  {
    label: 'It is possible to display the details of the order within this calendar.',
    imgPath:
    require("../assets/images/4.PNG"),
  },
  {
    label: 'If you require assistance with crop cultivation and soil fertilization, you may click on one of the options provided.',
    imgPath:
    require("../assets/images/5.PNG"),
  },
];
function Compte() {
  const [user, setUser] = useState({})
  const [open1, setOpen1] = useState(false)
  const [location, setLocation] = useState({})
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const auth = useSelector((state) => state.auth);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const getProfile = async () => {
    const data = await axios.get('http://localhost:8080/FarmerToConsumer/profile/', {
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    },{email:auth.user.email}) 
      .catch((err) => {
        console.log(err)
      }
      )
    setUser(data.data)
    setLocation(data.data.location)
    console.log(location)
    return data
  }
  const handleClose = () => {
    setOpen1(false);
    document.cookie = 'myCookie=false; path=/; expires=Thu, 01 Jan 2030 00:00:00 GMT';
  };
  
  useEffect(() => {
    getProfile();
    const myCookie = document.cookie.split(';').find(c => c.trim().startsWith('myCookie='));
    const myValue = myCookie ? myCookie.split('=')[1] : null;
    if (myValue !== "false" && auth.user.role==="FARMER") {
      setOpen1(true)
    }
  }, [])
  
  return (
    <>
      {
        open1 && <div>
          <Dialog
            open={open1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <Box sx={{ maxWidth: 900, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 300,
                  display: 'block',
                  maxWidth: 900,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      }

      <Grid columns={{ xs: 4, sm: 8, md: 10 }}>
        <List
          sx={{
            width: 260,
            maxWidth: 600,
            bgcolor: 'background.paper',
            marginTop: -3
          }}
        >
          <ListItem>
            <ListItemText primary="Name" secondary={user.name} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <EmailIcon sx={{ marginRight: 2 }} />
            <ListItemText primary="Email" secondary={user.email} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <LocalPhoneIcon sx={{ marginRight: 2 }} />
            <ListItemText primary="Phone Number" secondary={user.phoneNumber} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <HomeIcon sx={{ marginRight: 2 }} />
            <ListItemText primary="Address" secondary={location.streetAddress + " " + location.city + " " + location.postalCode} />
          </ListItem>

          <Divider component="li" />
          <ListItem>
            <DescriptionIcon sx={{ marginRight: 2 }} />
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
              user.role === "RESTAURANT" && (
                <ListItemAvatar>
                  <Avatar>
                    <RestaurantTwoToneIcon />
                  </Avatar>
                </ListItemAvatar>
              )}{
              user.role === "FARMER" && (
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
    </>


  )
}

export default Compte