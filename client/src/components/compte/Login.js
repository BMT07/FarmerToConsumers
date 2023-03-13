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
import ReCAPTCHA from 'react-google-recaptcha'
import { useEffect } from 'react';
const theme = createTheme();

export default function Login() {
  const [isVerified, setIsVerified] = useState(false);
  const[form,setForm]=useState({})
  const dispatch = useDispatch()
  const history = useHistory();
  const errors=useSelector(state=>state.errors)
  const onChangeHandler = (e) => {
   setForm({
    ...form,[e.target.name]:e.target.value
   })
    };
    const handleVerification = (response) => {
      setIsVerified(true);
    };
    const handleSubmit=(e)=>{
      e.preventDefault();
      if (isVerified) {
        dispatch(LoginAction(form, history))
      } else {
        alert("Veuillez cocher la case 'Je ne suis pas un robot'");
      }
     }
   
    

  return (
    <Container maxWidth="md">
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    mt={4}
    >
    <Card sx={{ display: 'flex',height:600,width:770 ,justifyContent:"center",
    alignItems:"center",boxShadow:5}}>
    <Box>
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
              error={errors.email}
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
              helperText={errors.email}            
            />
            <TextField
              error={errors.password}
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
              helperText={errors.password}
            />           
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ReCAPTCHA
                sitekey="6LfIKuokAAAAAMC2QIT5sl5ljrHbRquCG63N5Xnu"
                onChange={handleVerification}
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
                <Link to={'forget'}  variant="small">
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
       sx={{ width: 350, height:600,marginLeft:3,
        maxWidth: {xs:'100px', sm: '200px', md: '350px' },
           }}
       image={require("../assets/images/login-img.jpg")}
       alt="Live from space album cover"
     />
   </Card>
  </Box>
  </Container>
  );
}