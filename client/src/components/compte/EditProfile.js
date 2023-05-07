import { Alert, Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../controller/authActions';
function EditProfile() {
  const [location, setLocation] = useState({})
  const [alertSuccess, setShow] = useState(false)
  const [alertError, setShow1] = useState(false)
  const [user, setUsr] = useState({
    "id": "",
    "name": "",
    "email": "",
    "password": "",
    "location": "",
    "description": "",
    "phoneNumber": "",
  })
  const [formErrors, setFormErrors] = useState([]);
  const auth = useSelector(state => state.auth)
  const dispatch=useDispatch()
  const getProfile = async () => {
    const data = await axios.get('http://localhost:8080/FarmerToConsumer/profile/',{
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    })
    setUsr(data.data)
    setLocation(data.data.location)
    //console.log(location)
  }
  const { name, email, city, streetAddress, postalCode, description, phoneNumber } = user
  const handleformInput = (e) => {
    setUsr({
      ...user, [e.target.name]: e.target.value
    })
  }
  const handleLocation = (e) => {
    setLocation({
      ...location, [e.target.name]: e.target.value
    })
    setUsr({
      ...user, location: location
    })
  }
  const editProfile = async () => {
    const data1 = await axios.put('http://localhost:8080/FarmerToConsumer/Editprofile/' + user.email, user ,{
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    })
      .then(res => {
        console.log("success")
        dispatch(setUser(user))
      })
      .catch(
        (err) => {

          console.log(err.response.data)
        }
      )
    console.log(data1)
  }
  const validate = (values, loc) => {
    const errors = {};
    if (!values.name) {
      errors.name = "username required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "phoneNumber required";
    }
    if (!loc.city) {
      errors.city = "city required";
    }
    if (!loc.streetAddress) {
      errors.streetAddress = "streetAddress required";
    }
    if (!loc.postalCode) {
      errors.postalCode = "postalCode required";
    }
    if (isNaN(loc.postalCode)) {
      errors.postalCode = "Postal code must be a number";
    }
    if (isNaN(values.phoneNumber)) {
      errors.phoneNumber = "Phone number must be a number";
    }
    if (Object.keys(errors).length !== 0) {
      return { errors, isValid: false };
    } else {
      return { isValid: true };
    }
  };

  let erreur = { "name": "", "phoneNumber": "" };
  const onSubmit = (e) => {
    e.preventDefault();
    const validationResult = validate(user, location);
    if (!validationResult.isValid) {
      setShow1(true)
      setTimeout(() => {
        setShow1(false);
      }, 2000);
    } else {
      setShow(true)
      setTimeout(() => {
        setShow(false);
      }, 2000);
      editProfile();
    }
  }
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 0 }}>
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
          <div>{erreur.name}</div>
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
            fullWidth
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
        <Grid container spacing={2} mt={1}>
        <Grid item xs={6} md={3}>
          <Button type="submit" variant="outlined" color="success" size="large" endIcon={<EditIcon />}>
            Edit
          </Button>
          </Grid>
          <Grid  item xs={6} md={9}>
          {
            (alertSuccess) && (
              <Alert severity="success">Profile updated !</Alert>
            )}
          {
            (alertError) &&
            (<Alert severity="error">Check fields !</Alert>)
          }
        </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default EditProfile