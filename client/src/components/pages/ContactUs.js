import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { Alert,Stack } from '@mui/material';

export default function ContactUs() {
  const [alert, setAlert] = React.useState(false);
  const [alertError, setShow1] = React.useState(false)
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const validate = (data) => {
    const errors = {};
    if (!data.Firstname) {
      errors.Firstname = "Firstname required";
    }
    if (!data.Lastname) {
      errors.Lastname = "Lastname required";
    }
    if (!data.email) {
      errors.email = "Email required";
    }
    if (!data.Subject) {
      errors.Subject = "Subject required";
    }
    if (!data.msg) {
      errors.msg = "Message required";
    }
    if (!isValidEmail(data.email)) {
      errors.email = "Email required";
    }
    if (Object.keys(errors).length !== 0) {
      return { errors, isValid: false };
    } else {
      return { isValid: true };
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const validationResult = validate({
      email: data.get('email'),
      Lastname: data.get('lastName'),
      Firstname: data.get('firstName'),
      Subject: data.get('subject'),
      msg: data.get('message')
    });
    if (!validationResult.isValid) {
      setShow1(true)
      setTimeout(() => {
        setShow1(false);
      }, 2000);
    } else {
      await axios.post('http://localhost:8080/FarmerToConsumer/contactus', {
        email: data.get('email'),
        Lastname: data.get('lastName'),
        Firstname: data.get('firstName'),
        Subject: data.get('subject'),
        msg: data.get('message')
      }).then(() => {
        setAlert(true);
        setTimeout(() => {
          document.getElementById('firstName').value = '';
          document.getElementById('lastName').value = '';
          document.getElementById('email').value = '';
          document.getElementById('subject').value = '';
          document.getElementById('outlined-multiline-static').value = '';
        }, 100);
      }, 100);
    }
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#F1F8E9', height: 200, border: '1px solid #E3E3E3' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: 50, marginTop: 4 }}>
          Contact Us
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          Send us your request via the online form opposite.
        </Box>
      </Box>

      <Container component="main" maxWidth="md">.
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {alert && (<Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => { setAlert(false) }}>Mail send successfully !</Alert>
          </Stack>)}
          {alertError && (<Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => { setAlert(false) }} severity='error'>Check your Fields !</Alert>
          </Stack>)}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  color='success'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  color='success'

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  color='success'

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="subject"
                  label="Subject"
                  type="text"
                  color='success'
                  id="subject"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-multiline-static"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  color='success'

                />
              </Grid>

            </Grid>
            <Button
              color='success'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Let's Talk
            </Button>

          </Box>
        </Box>
      </Container>

    </>
  );
}