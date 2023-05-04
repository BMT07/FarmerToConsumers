import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';




export default function ContactUs() {

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios.post('http://localhost:8080/FarmerToConsumer/contactus',{
      email: data.get('email'),
      Lastname: data.get('lastName'),
      Firstname: data.get('firstName'),
      Subject: data.get('subject'),
      msg: data.get('message')
    } ).then((res)=>console.log(res.data)).catch((err)=>console.log(err))
    console.log({
      email: data.get('email'),
      Lastname: data.get('lastName'),
      Firstname: data.get('firstName'),
      Subject: data.get('subject')
    });
  };

  return (
    <>
    <Box sx={{ backgroundColor: '#F1F8E9', height: 200, border: '1px solid #E3E3E3' }}>
        <Box sx={{display:'flex',justifyContent:'center',fontSize:50,marginTop:4}}>
        Contact Us
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}}>
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
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="subject"
                  label="Subject"
                  type="text"
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