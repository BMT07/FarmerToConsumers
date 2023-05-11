import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, TextField, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
}));

const OrderDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    user: '',
    total: '',
    statusPayment: '',
    etat: '',
    createdAt: '',
  });

  useEffect(() => {
    axios.get(`/api/orders/${id}`).then((response) => {
      const { user, total, statusPayment, etat, createdAt } = response.data;
      setData({ user, total, statusPayment, etat, createdAt });
    });
  }, [id]);

  const handleBackClick = () => {
    navigate('/dashboard/orders');
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        Order Details
      </Typography>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="user"
              label="User"
              value={data.user}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="createdAt"
              label="Creation Date"
              value={new Date(data.createdAt).toLocaleDateString()}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="statusPayment"
              label="Payment Status"
              value={data.statusPayment ? 'Done' : 'Pending'}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="etat"
              label="Order State"
              value={data.etat ? 'Done' : 'Pending'}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="total"
              label="Total in Dt"
              value={data.total}
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

export default OrderDetail;
