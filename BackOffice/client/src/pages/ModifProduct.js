import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Box } from '@mui/material';
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

const ModifProduct = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    image: '',
    price: '',
    quantity: '',
    productionDate: '',
    organic: false,
    farmer: '',
    category: '',
  });

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((response) => {
      const { name, image, price, quantity, productionDate, farmer, category, organic } = response.data;
      setData({ name, image, price, quantity, productionDate, farmer, category, organic });
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`/api/products/${id}`, data);
      navigate('/dashboard/products');
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
        <TextField
          required
          id="name"
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={data.name}
          onChange={(e) => onValueChange(e)}
        />
        {/* <Form.Group controlId="dob">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            id="productionDate"
            value={new Date(data.productionDate)} 
            type="date"
            name="productionDate"
            placeholder={data.productionDate}
            onChange={(e) => onValueChange(e)}
          />
        </Form.Group> */}

        <TextField
          required
          name="price"
          id="price"
          label="price"
          type="number"
          variant="outlined"
          fullWidth
          value={data.price}
          onChange={(e) => onValueChange(e)}
        />

        <TextField
          required
          id="quantity"
          name="quantity"
          label="quantity"
          multiline
          variant="outlined"
          fullWidth
          value={data.quantity}
          onChange={(e) => onValueChange(e)}
        />
        <TextField
          required
          id="productionDate"
          name="productionDate"
          label="productionDate"
          multiline
          variant="outlined"
          fullWidth
          value={new Date(data.productionDate).toLocaleDateString()}
          onChange={(e) => onValueChange(e)}
        />
        <TextField
          required
          id="farmer"
          name="farmer"
          label="farmer"
          multiline
          variant="outlined"
          fullWidth
          value={data.farmer}
          onChange={(e) => onValueChange(e)}
        />
        <TextField
          required
          id="organic"
          name="organic"
          label="organic"
          multiline
          variant="outlined"
          fullWidth
          value={data.organic}
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
          onClick={() => navigate('/dashboard/products')}
        >
          Back
        </Button>
      </Box>
    </form>
  );
};

export default ModifProduct;
