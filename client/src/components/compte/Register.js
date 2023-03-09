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
import { Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useState } from 'react';
import axios from 'axios';
import{useDispatch} from 'react-redux'
import { Registration } from '../../controller/authActions';





const theme = createTheme();

export default function Register() {
    const url = "http://localhost:8080/FarmerToConsumer/register";
    const history = useHistory();
    const [user,setUser]=useState({
        "id": "",
        "name": "",
        "email": "",
        "password": "",
        "city": "",
        "streetAddress": "",
        "postalCode": "",
        "confirm":"",
        "description":"",
        "phoneNumber":"",
        "role":""
    })
    const{name,email,password,city,streetAddress,postalCode,confirm,description,phoneNumber,role}=user
    const dispatch= useDispatch()
 
    const handleformInput=(e)=>{
          setUser({
              ...user,[e.target.name]:e.target.value
          })}
    
    // const addUser=async()=>{
    //    return await axios.post(url,user);
    // }
    // const save=async()=>{
    //     try {
    //         const res=await addUser()
    //         if(res.status===200){
    //             console.log("success")
    //             history.push('/login')
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(user);
        dispatch(Registration(user,history))

    }



    return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    mt={3}
    >
    <Card sx={{ display: 'flex',height:950,width:800 ,justifyContent:"center",
    alignItems:"center",boxShadow:5}}>
    <Box  sx={{ display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flex: '1 0 auto' }}>
       
        <Box display="flex"
      justifyContent="center"
      alignItems="center"
      >
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate  sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={15} sm={6}>

                                <TextField
                                    value={name} onChange={(e)=>handleformInput(e)}
                                    color="success"
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    value={phoneNumber} onChange={(e)=>handleformInput(e)}
                                    color="success"
                                    required
                                    fullWidth
                                    id="phonenumber"
                                    label="Phone number"
                                    name="phoneNumber"
                                    type="tel"
                                    autoComplete="family-name"
                                />

                            </Grid>
                            <Grid item xs={16}>
                                <TextField
                                    value={email} onChange={(e)=>handleformInput(e)}
                                    color="success"
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
                                    value={password} onChange={(e)=>handleformInput(e)}
                                    color="success"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={confirm} onChange={(e)=>handleformInput(e)}
                                    color="success"
                                    required
                                    fullWidth
                                    name="confirm"
                                    label="Confirm password"
                                    type="password"
                                    id="confirm"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                                    <Select
                                        value={city} onChange={(e)=>handleformInput(e)}
                                        name="city"
                                        label="City"
                                        color="success"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    value={streetAddress} onChange={(e)=>handleformInput(e)}
                                    color="success"
                                    autoComplete="given-name"
                                    name="streetAddress"
                                    required
                                    fullWidth
                                    id="streetaddress"
                                    label="Street address"
                                    autoFocus
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    value={postalCode} onChange={(e)=>handleformInput(e)}
                                    color="success"
                                    required
                                    fullWidth
                                    id="postalcode"
                                    label="Postal code"
                                    name="postalCode"
                                    autoComplete="family-name"
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        value={role} 
                                        onChange={(e)=>handleformInput(e)}
                                        color="success"
                                        // value={age}
                                        label="Role"
                                        name="role"
                                    >
                                        <MenuItem value={"RESTAURANT"}>RESTAURANT MANAGER</MenuItem>
                                        <MenuItem value={"FARMER"}>FARMER</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="success" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                        // onClick={save}
                            className='button'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            type="submit"
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to={'login'} variant="body2">
                                   <small>Already have an account? Sign in</small> 
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </Box>

    </CardContent>
    </Box >
       <CardMedia
       component="img"
       sx={{ width: 300, height:950,marginLeft:3 ,maxWidth: {xs:'100px', sm: '200px', md: '350px' }}}
       image={require("../assets/images/register-img.jpg")}
       alt="Live from space album cover"
     />
   </Card>
  </Box>
        
    );
}