import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import PaymentFailedImage from '.././assets/images/successPay.jpg'
import { Heading } from '../common/Heading';
import { EMPTYCART } from '../../controller/action';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: 3,



  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  image: {
    maxWidth: '80%',
    height: 'auto',
  },
  textContainer: {
    flex: 1,
    paddingRight: 3
  },
});



function SuccessPayment() {
  const dispatch = useDispatch()

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("payment_id");
  const Clear=()=>{
    dispatch(EMPTYCART())
    console.log("clear")
}

  
  const updateOrderSatus = async () => {
    await axios.put("http://localhost:8080/FarmerToConsumer/modifyOrder").then((res) => console.log("updated")).catch((err) => console.log(err))
  }
  useEffect(() => {     
    axios.post(`http://localhost:8080/FarmerToConsumer/payment/${searchQuery}`)
      .then(res => {
        console.log(res.data);
        if (res.data.success === true) { updateOrderSatus(); Clear(); }
      })
      .catch(err => console.log(err));
}, [])

  const classes = useStyles();
  const history = useHistory()
  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.textContainer}>
        <Heading title='Payment successful' />
        <Typography sx={{ marginLeft: 5 }} variant="body1">
          Thank you for choosing Farmer to Consumer, your custom reports will be generated within two busness days.
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={5}
        >
          <img style={{ width: '70%' }} src={require('.././assets/images/success.png')} alt='success' />

        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={5}
        >
          <Button color='success' variant='contained' size="large"
            sx={{ marginRight: 5, borderRadius: '20px', width: 180 }}
            onClick={() => history.push('/shop')}
          >New Site</Button>
          <Button color='success' variant='outlined' size="large"
            sx={{marginRight: 5, borderRadius: '20px', width: 180 }}
            onClick={() => history.push('/')}
          >Back Home</Button>

        </Grid>
      </div>
      <div className={classes.imageContainer}>
        <img src={PaymentFailedImage} alt="Paiement échoué" className={classes.image} style={{ marginRight: '60px' }} />
      </div>
    </Paper>
  )
}

export default SuccessPayment