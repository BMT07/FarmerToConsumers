import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Form } from 'react-bootstrap';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const ModifOrder = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    statusPayment: '',
    etat: '',
  });

  useEffect(() => {
    axios.get(`/api/orders/${id}`).then((response) => {
      const { statusPayment, etat } = response.data;
      setData({ statusPayment, etat });
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`/api/orders/${id}`, data);
      navigate('/dashboard/orders');
    } catch (error) {
      console.error(error);
    }
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Box bgcolor="white" p={3} borderRadius="10px">
        <Typography variant="h5" component="h1" gutterBottom>
          Modify Order
        </Typography>
        <TextField
          required
          id="statusPayment"
          label="Payment Status"
          name="statusPayment"
          variant="outlined"
          fullWidth
          value={data.statusPayment}
          onChange={(e) => onValueChange(e)}
        />

        <TextField
          required
          name="etat"
          id="etat"
          label="Order State"
          type="boolean"
          variant="outlined"
          fullWidth
          value={data.etat}
          onChange={(e) => onValueChange(e)}
        />

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }} style={{ marginLeft: '380px' }}>
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          style={{ marginLeft: '10px' }}
          onClick={() => navigate('/dashboard/orders')}
        >
          Back
        </Button>
      </Box>
    </form>
  );
};

export default ModifOrder;
