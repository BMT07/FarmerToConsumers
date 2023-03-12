import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import axios from 'axios';

function EditProfile() {
    
    const [location, setLocation]=useState({})
    const [user,setUser] =useState({
        "id": "",
        "name": "",
        "email": "",
        "password": "",
        "location":"",
        "description": "",
        "phoneNumber": "",
    }) 
    const auth=useSelector(state=>state.auth)
    const getProfile=async()=>{
      const data= await axios.get('http://localhost:8080/FarmerToConsumer/profile/'+auth.user.email)
      setUser(data.data) 
      setLocation(data.data.location)
      console.log(location)
    }
    const { name, email, city, streetAddress, postalCode, description, phoneNumber } = user
    const handleformInput = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })      
    }
    const handleLocation=(e)=>{
        setLocation({
            ...location, [e.target.name]: e.target.value
        })
        setUser({
            ...user, location:location
        })
    }
    const editProfile=async()=>{
        const data= await axios.put('http://localhost:8080/FarmerToConsumer/Editprofile/'+user.id, user)
        console.log(data)
      }
    const onSubmit = (e) => {
        e.preventDefault();
        editProfile();
        console.log(user);

    }
    useEffect(() => {
        getProfile()       
    }, [])
  return (
    <div>
         <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
         <Grid container spacing={2}>
            <Grid item xs={15} sm={6}>
        <TextField
          label="Name"
          name="name"
          value={name}
          defaultValue=" "
          variant="filled"
          size="small"
          onChange={(e) => handleformInput(e)}
        />
        </Grid>
        <Grid item xs={15} sm={6}>
        <TextField
          name="phoneNumber"
          label="phoneNumber"
          value={phoneNumber}
          defaultValue=" "
          variant="filled"
          size="small"
          onChange={(e) => handleformInput(e)}
        />
        </Grid>       
        </Grid>
        <Grid item xs={16} mt={2}>
        <TextField
         name="email"
          label="Email"
          value={email}
          defaultValue=" "
          variant="filled"
          size="small"
          fullWidth
          disabled
          onChange={(e) => handleformInput(e)}
        /> 
        </Grid>
        <Grid item xs={16} mt={2}>
        <TextField
          name="city"
          label="City"
          value={location.city}
          defaultValue="  "
          variant="filled"
          size="small"
          onChange={(e) => handleLocation(e)}

        /> 
        </Grid>
        <Grid container spacing={2} mt={1}>
            <Grid item xs={15} sm={6}>
            <TextField
            name="streetAddress"
            label="Street address"
            value={location.streetAddress}
            defaultValue=" "
            variant="filled"
            size="small"
            onChange={(e) => handleLocation(e)}
            />
        </Grid>
        <Grid item xs={15} sm={6}>
            <TextField
            name="postalCode"
            value={location.postalCode}
            label="Postal code"
            defaultValue=" "
            variant="filled"
            size="small"
            onChange={(e) => handleLocation(e)}
            />
        </Grid>       
        </Grid>
        <Grid item xs={16} mt={2}>
        <TextField
        name="description"
          label="Description"
          value={description}
          defaultValue=" "
          variant="filled"
          size="small"
          fullWidth
          multiline
          onChange={(e) => handleformInput(e)}
        /> 
        </Grid>
        <Grid item xs={16} mt={2}>
        <Button type="submit" variant="outlined" color="success" size="large" endIcon={<EditIcon />}>
          Edit 
        </Button>
        </Grid>
        </Box>
    </div>
  )
}

export default EditProfile