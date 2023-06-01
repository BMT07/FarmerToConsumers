import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { Alert, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Heading } from '../../common/Heading';

export default function Blog() {
  const [alert, setAlert] = React.useState(false);
  const [alertError, setShow1] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const validationResult = validate({
      Name: data.get('Name'),
      CompanyName: data.get('CompanyName'),
      subject: data.get('subject'),
      description: data.get('description')
    });
    if (!validationResult.isValid) {
      setShow1(true)
      setTimeout(() => {
        setShow1(false);
      }, 2000);
    } else {
    await axios.post('http://localhost:8080/FarmerToConsumer/AddBlog', {
      Name: data.get('Name'),
      CompanyName: data.get('CompanyName'),
      subject: data.get('subject'),
      description: data.get('description')
    }).then(() => {
      setAlert(true);
      setTimeout(() => {
        document.getElementById('Name').value = '';
        document.getElementById('CompanyName').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('outlined-multiline-static').value = '';
      }, 100);
    }, 100);}
  };
  const validate = (obj) => {
    const errors = {};
    if (!obj.Name) {
      errors.Name = "Name required";
    }
    if (!obj.CompanyName) {
      errors.CompanyName = "CompanyName required";
    }
    
    if (!obj.subject) {
      errors.subject = "Subject required";
    }
    if (!obj.description) {
      errors.description = "Description required";
    }if (Object.keys(errors).length !== 0) {
      return { errors, isValid: false };
    } else {
      return { isValid: true };
    }
   
  };
  let erreur = { "Name": "", "CompanyName": "" , "subject":"", "description":""};

  return (
    <>
    <Box sx={{ backgroundColor: '#F1F8E9', height: 200, border: '1px solid #E3E3E3' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: 50, marginTop: 4 }}>
          Blog
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        Feel free to provide your feedback, share your opinion, ask for news updates, or discuss anything you'd like.
        </Box>
      </Box>

      <Container component="main" maxWidth="md">.
        <CssBaseline />
        <Card sx={{ maxWidth: 1000 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={require("../../../components/assets/images/farmer.png")}
        title="green iguana"
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
      <Container component="main" maxWidth="md">.
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {alert && (<Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => { setAlert(false) }}>We will verify and post it soon !</Alert>
          </Stack>)}
          {
            (alertError) &&
            (<Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => { setShow1(false) }} severity='error'>Check fields !</Alert>
          </Stack>)
          }

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="First Name"
                  autoFocus
                  color='success'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="CompanyName"
                  label="Company Name"
                  name="CompanyName"
                  autoComplete="family-name"
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
                  name="description"
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
      </Container></Typography>
      </CardContent>
    </Card>
    </Container>
    </>
  );
}