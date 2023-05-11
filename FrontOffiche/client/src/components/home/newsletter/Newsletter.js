import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box, Alert, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from "axios"


import newsletterBackground from '../../assets/images/lettre.png';

const NewsletterContainer = styled(Grid)(({ theme }) => ({
  //   backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
  },
  backgroundImage: `url(${newsletterBackground})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 220,
  backgroundSize: 210,
  [theme.breakpoints.only('xs')]: {
    backgroundImage: 'none',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'black',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(4),
  },
}));

const Input = styled(TextField)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  //   backgroundColor: theme.palette.common.white,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    minWidth: '450px',
    marginRight: theme.spacing(0),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: '100%',
  height: 45,
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    minWidth: '150px',
    marginTop: 0,
  },
}));

const Newsletter = () => {
  const [email, setEmail] = useState({ email: '' })
  const [alert, setAlert] = React.useState(false);
  const [alert1, setAlert1] = React.useState(false);

  const handleformInput = (e) => {
    setEmail({
      [e.target.name]: e.target.value
    })
  }
  const handelClick = async () => {
    console.log(email)
    const res = await axios.post('http://localhost:8080/FarmerToConsumer/AddNewsletter', email)
      .then(() => {
        setTimeout(() => {
          document.getElementById('email').value = '';
        }, 100);
        setAlert(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 500) {
          setAlert1(true);
        }
      });
  };

  return (
    <Box sx={{ p: 1, marginTop: 5 }}>
      <NewsletterContainer container justifyContent="center">
        <Grid item xs={12} sm={6} md={8}>
          <Title variant="h5" component="h2" align="center">
            Subscribe to our Newsletters
          </Title>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={7} md={6}>
              <Input
                id="email"
                name="email"
                label="Entrez votre adresse e-mail"
                variant="filled"
                size="small"
                //value={email}
                InputProps={{ disableUnderline: true }}
                color='success'
                onChange={(e) => handleformInput(e)}
              />
            </Grid>
            <Grid item xs={12} sm={5} md={1} m={1}>
              <SubmitButton variant="contained" color="success" size="large" onClick={handelClick}>
                Subscribe
              </SubmitButton>
            </Grid>
          </Grid>

        </Grid>
        {alert && (<Stack sx={{ width: '40%' }} spacing={2}>
          <Alert onClose={() => { setAlert(false) }}>Mail added !</Alert>
        </Stack>)}
        {alert1 && (<Stack sx={{ width: '40%' }} spacing={2}>
          <Alert severity="error" onClose={() => { setAlert1(false) }}>You're already added !</Alert>
        </Stack>)}
      </NewsletterContainer>
    </Box>
  );
};

export default Newsletter;
