import { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Box,
    Paper,
    TextField,
    Grid,
    Typography,
    Button,
    InputLabel,
    Input,
    Container,
    MenuItem, Select, FormControl
} from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/system';
import { useHistory } from 'react-router-dom';
const theme = createTheme({
    spacing: 8,
    margin: 4,
    borderRadius: 2
});

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
}));

const AddProduct = () => {
    const classes = useStyles();
    const history = useHistory()
    const [data, setData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        quantity: "",
        productionDate: "",
        organic: "",
        image: "string"
    });

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setData({ ...data, image: reader.result });
        };

        reader.onerror = (error) => {
            console.error("Error:", error);
        };
    };
    const { name, price, category, description, quantity, productionDate, organic, image } = data;
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/FarmerToConsumer/addProduct', data,{
                headers: { Authorization: `${localStorage.getItem('jwt')}` }
              }).then((res) => {
                history.push('/farmer')
                console.log(res.data)
            }
            )

        } catch (err) {
            console.error(err.message);
        }
    };





    return (
        <Container maxWidth="md" style={{ paddingTop: "20px" }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Add Product
            </Typography>
            <form className={classes.root} onSubmit={handleSubmit}>
                <Paper className={classes.root} style={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="name"
                                label="Name"
                                name="name"
                                value={data.name}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="price"
                                label="Price"
                                name="price"
                                type="number"
                                value={data.price}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="Category"
                                name="category"
                                label="Category"
                                value={data.category}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                                select
                            >
                                <MenuItem value="Fruits">Fruits</MenuItem> 
                                <MenuItem value="Vegetables">Vegetables</MenuItem>
                                <MenuItem value="Grains">Grains</MenuItem>
                                <MenuItem value="Dairy Products">Dairy Products</MenuItem>
                                <MenuItem value="Meats and Eggs">Meats and Eggs</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="productionDate"
                                name="productionDate"
                                label=""
                                type="date"
                                value={data.productionDate}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="quantity"
                                type="number"
                                label="Quantity"
                                name="quantity"
                                value={data.quantity}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="description"
                                name="description"
                                label="Description"
                                value={data.description}
                                fullWidth
                                required
                                onChange={(e) => onValueChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="isOrganic-label" style={{ marginTop: "10px" }}>Is Organic?</InputLabel>
                                <Select
                                    labelId="isOrganic-label"
                                    id="isOrganic"
                                    name="organic"
                                    value={data.organic}
                                    onChange={(e) => onValueChange(e)}
                                    required
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="image">Image</InputLabel>
                            <Input
                                id="image"
                                type="file"
                                inputProps={{ accept: "image/*" }}
                                onChange={(e) => handleImageChange(e)}
                            />
                        </Grid>
                    </Grid>

                   
                </Paper>
            </form>
            <div></div>
            <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                  >Add product
                        
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => history.push('/farmer')}
                      >                    
                        Back
                    </Button>
        </Container>

    );
};


export default AddProduct;