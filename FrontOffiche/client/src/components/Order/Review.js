import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';



const payments = [
  { name: 'Card type', detail: 'Master Card' },
  { name: 'Method of payment', detail: 'Flouci' },
  { name: 'Mode of payment', detail: 'Online' },
];

export default function Review({handleNext, price, cartProducts}) {
  
  const delivery = useSelector((state) => state.delivery.delivery)
  const auth = useSelector((state) => state.auth);
  const addresses = [delivery.address, delivery.city, delivery.streetAddress,delivery.postalCode, 'Tunis'];

  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartProducts.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.quantity +"x "+ product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {price} Dt
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Delivery Price" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {delivery.frais} Dt
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{auth.user.name}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
          <Typography gutterBottom>Delivery date: {delivery.dateLivraison}</Typography>

        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid
          container
          direction="row"
          justifyContent="end"
          alignItems="center"
          mt={2}
        >
      <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={()=>handleNext()}>next</Button>
        </Grid>

    </React.Fragment>
  );
}
