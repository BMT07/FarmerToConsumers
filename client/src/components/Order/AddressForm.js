import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Review from './Review';
import { Alert, Button, ButtonBase } from '@mui/material';
import { GET_DELIVERY_ADDRESS } from '../../controller/actionDelivery';
import { useHistory } from 'react-router-dom';

export default function AddressForm({handleNext}) {
  const auth = useSelector(state => state.auth)
  const [user, setUser] = useState({})
  const [location, setLocation] = useState({})
  const [deliv, setdeliv] = useState({})
  const dispatch=useDispatch()
  const [alertError, setShow1] = useState(false)

  const getDonnes = async () => {
    
    const dat = await axios.get('http://localhost:8080/FarmerToConsumer/donnes/' + auth.user.email,{
      headers: { Authorization: `${localStorage.getItem('jwt')}`}}
      ).catch(err=>console.log(err))    
    
    setUser(dat.data)
    setLocation(dat.data.location)
    setdeliv(dat.data.location)
    console.log(location)
    return dat
  }
  const handleDelivery = (e) => {
    setdeliv({
      ...deliv, [e.target.name]: e.target.value
    })
    
  }
  const history=useHistory()
  useEffect(() => {
    getDonnes()
  }, [])


  const validate = (loc) => {
    const errors = {};
    if (!loc.city) {
      errors.city = "City required";
    }
    if (!loc.streetAddress) {
      errors.streetAddress = "StreetAddress required";
    }
    if (!loc.postalCode) {
      errors.postalCode = "PostalCode required";
    }
    if (isNaN(loc.postalCode)) {
      errors.postalCode = "Postal code must be a number";
    }
    if (!loc.address) {
      errors.address = "Address required";
    }
    if (!loc.dateLivraison) {
      errors.dateLivraison = "dateLivraison required";
    }
    if (Object.keys(errors).length !== 0) {
      return { errors, isValid: false };
    } else {
      return { isValid: true };
    }
  };
  const handelForm=()=>{
    const validationResult = validate(deliv);
    if (!validationResult.isValid) {
      setShow1(true)
      setTimeout(() => {
        setShow1(false);
      }, 2000);
    } else {
      handleNext();dispatch(GET_DELIVERY_ADDRESS(deliv))
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={user.name}
            defaultValue=" "
            required
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          value={user.phoneNumber}
          defaultValue=" "
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="phone-number"
            variant="standard"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={user.email}
            defaultValue=" "
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            disabled={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address line "
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
            onChange={(e)=>handleDelivery(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={deliv.city}
            defaultValue=" "
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e)=>handleDelivery(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          value={deliv.streetAddress}
          defaultValue=" "
            id="streetAddress"
            name="streetAddress"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={(e)=>handleDelivery(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          value={deliv.postalCode}
          defaultValue=" "
            required
            id="postalCode"
            name="postalCode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(e)=>handleDelivery(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            sx={{marginTop:2}}
            required
            id="dateLivraison"
            name="dateLivraison"
            label=""
            type="date"
            fullWidth
            autoComplete="dateLivraison"
            variant="standard"
            onChange={(e)=>handleDelivery(e)}

          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Grid container spacing={2}
        alignItems={'center'}
          >
          <Grid item xs={6} md={10}> 
          {
            (alertError) &&
            (<Alert sx={{ mt: 3, ml: 1 }} severity="error">Check fields !</Alert>)
          }
          </Grid>
        <Grid item xs={6} md={2}> 
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={()=>handelForm()}>next</Button>
        </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
