import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent, CardMedia, Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from '../../controller/authActions';

const theme = createTheme();

export default function Login() {
  const[form,setForm]=useState({})
  const dispatch = useDispatch()
  const history = useHistory();
  const errors=useSelector(state=>state.errors)
  const onChangeHandler = (e) => {
   setForm({
    ...form,[e.target.name]:e.target.value
   })
    };
   const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(LoginAction(form, history))
   }

  return (
    
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    mt={4}
    >
    <Card sx={{ display: 'flex',height:600,width:770 ,justifyContent:"center",
    alignItems:"center",boxShadow:5}}>
    <Box  sx={{ display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flex: '1 0 auto' }}>

    <Box >
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft:"12px"
          }}
        >
          <Avatar sx={{ m: 1,mt:-6, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
             color="success"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeHandler}
              
            />
            <div>{errors.email}</div>
            <TextField
            color="success"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeHandler}

            />
            <div>{errors.password}</div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button className='button'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="small">
                  <small>Forgot password?</small>
                </Link>
              </Grid>
              <Grid item>
                <Link to={'register'} variant="body2">
                  <small>{"Don't have an account? Sign Up"}</small>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      </Box>

      </CardContent>
      </Box>
       <CardMedia
       component="img"
       sx={{ width: 350, height:600,marginLeft:3 }}
       image={require("../assets/images/login-img.jpg")}
       alt="Live from space album cover"
     />
   </Card>
  </Box>
  );
}