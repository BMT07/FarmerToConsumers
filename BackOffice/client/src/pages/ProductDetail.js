import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, TextField, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    name: '',
    image: '',
    price: '',
    quantity: '',
    productionDate: '',
    farmer: '',
  });

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((response) => {
      const { name, image, price, quantity, productionDate, farmer } = response.data;
      setData({ name, image, price, quantity, productionDate, farmer });
    });
  }, [id]);

  const handleBackClick = () => {
    navigate('/dashboard/products');
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        Product Details
      </Typography>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              value={data.name}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="price"
              label="price"
              value={data.price}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="quantity"
              label="quantity"
              value={data.quantity}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="productionDate"
              label="productionDate"
              value={data.productionDate}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="farmer"
              label="farmer"
              value={data.farmer}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" onClick={handleBackClick}>
          Back to Dashboard
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductDetail;
