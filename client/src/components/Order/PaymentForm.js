import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function PaymentForm({handleNext, price}) {
  const cartProducts=useSelector((state)=>state.cartReducer.carts)
  const delivery = useSelector((state) => state.delivery.delivery)
  const total=price+delivery.frais
  const payment=()=>{
    axios.post("http://localhost:8080/FarmerToConsumer/payment", {amount:total})
    .then((res)=>{
      const {result}=res.data
      window.location.href=result.link
    })
    .catch((err)=>console.log(err))
  }
  const ordering=async()=>{
    await axios.post("http://localhost:8080/FarmerToConsumer/addOrder", {
        total: price,
        address: delivery.address,
        streetAddress: delivery.streetAddress,
        city: delivery.city,
        postalCode: delivery.postalCode,
        dateLivraison: delivery.dateLivraison,
        products: cartProducts.map((e)=>e._id),
        frais:delivery.frais,
        productsNameQty:cartProducts
    } ,{
        headers: { Authorization: `${localStorage.getItem('jwt')}` }
      })
      .then((res)=>{console.log(res.data);})
      .catch((err)=>console.log(err))
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="if you are going to validate the order you have to click on the place order button and enter the payment information ." />
          </ListItem>

          <Box>
            <img style={{width:'300px',marginLeft:'90px'}} src={require('.././assets/images/paiement.jpg')} alt='paiment' />
          </Box>
          <Grid
          container
          direction="row"
          justifyContent="end"
          alignItems="center"
          mt={2}
        >
      <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={()=>{payment();ordering()}}>Place order</Button>

        </Grid>

    </React.Fragment>
  );
}
