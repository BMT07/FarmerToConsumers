import { React, useState, useEffect } from 'react'
import axios from "axios"
import { FiShoppingBag, FiSearch } from "react-icons/fi"
import { AiOutlineEdit, AiOutlineClose, AiOutlineDelete } from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useHistory } from 'react-router-dom';
import "../assets/csss/buttoons.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PsychologyIcon from '@mui/icons-material/Psychology';


import {
  Container, Dialog, DialogTitle, MenuItem, Paper, TextField, Select, FormControl, InputLabel,
  Input, CardActions, Breadcrumbs, ButtonGroup, CardActionArea, Backdrop
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Card, Typography, CardMedia, CardContent } from "@mui/material"
import ReactPaginate from 'react-paginate';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/system';
import { Box, Button, Alert, AlertTitle, Grid } from '@mui/material';
import { HashLoader } from "react-spinners"

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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previousPage: {
    cursor: 'pointer',
  },
  nextPage: {
    cursor: 'pointer',
  },
  paginationDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  paginationActive: {

  },
}));



function Farmer() {
  const [datas, setDatas] = useState([])
  const [openImage, setOpenImage] = useState(false)
  const [img, setImg] = useState("")
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const history = useHistory()
  const [expanded, setExpanded] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [cartAi, setCartAi] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);



  const handleAddClick = () => {
    setIsEditing(false);
    setSelectedProductId(null);
    setOpen(true);
  };
  const [productData, setProductData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      setLoading(true)
      if (isEditing) {
        await axios.put(`http://localhost:8080/FarmerToConsumer/update/${selectedProductId}`, data, {
          headers: { Authorization: `${localStorage.getItem('jwt')}` }
        }).then((res) => {
          console.log(res.data)
          setOpen(false);
          setIsEditing(false)

          axios.get('http://localhost:8080/FarmerToConsumer/getProduct', {
            headers: { Authorization: `${localStorage.getItem('jwt')}` }
          }).then((res) => {
            setDatas(res.data)
            setLoading(false)
          }).catch(err => {
            console.log(err)
          })
        })
      } else {
        setIsEditing(false);
        setSelectedProductId(null);
        await axios.post('http://localhost:8080/FarmerToConsumer/addProduct', data, {
          headers: { Authorization: `${localStorage.getItem('jwt')}` }
        }).then((res) => {
          console.log(res.data)
          setOpen(false);
          
          axios.get('http://localhost:8080/FarmerToConsumer/getProduct', {
            headers: { Authorization: `${localStorage.getItem('jwt')}` }
          }).then((res) => {
            setDatas(res.data)
            setLoading(false)
          }).catch(err => {
            console.log(err)
          })
        })
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (selectedProductId) {
      axios.get(`http://localhost:8080/FarmerToConsumer/getProducts/${selectedProductId}`, {
        headers: { Authorization: `${localStorage.getItem('jwt')}` }
      }).then((res) => {
        setProductData(res.data);
      }).catch(err => {
        console.log(err)
      })
    }
  }, [selectedProductId]);

  const handleDelete = (id) => {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      setLoading(true)
      try {
        axios.delete(`http://localhost:8080/FarmerToConsumer/deleteProduct/${id}`,{
          headers: { Authorization: `${localStorage.getItem('jwt')}` }
        }).then(() => {
          setDatas(datas.filter(user => user._id !== id))
          setDeletedUserId(id);
          setTimeout(() => {
            setDeletedUserId(null);
          }, 3000);
          setLoading(false)
        })
      } catch (err) {
        console.log(err.message)
      }
    }
  }
  const handleEdit = (id) => {
    setSelectedProductId(id);
    setIsEditing(true);
    setOpen(true);


    const productToEdit = datas.find((product) => product._id === id);

    setData({
      name: productToEdit.name,
      price: productToEdit.price,
      category: productToEdit.category,
      description: productToEdit.description,
      quantity: productToEdit.quantity,
      productionDate: productToEdit.productionDate,
      organic: productToEdit.organic,
      image: productToEdit.image
    });
  };




  const onOpenImage = (src) => {
    setImg(src)
    setOpenImage(true)
  }
  useEffect(() => {
    axios.get('http://localhost:8080/FarmerToConsumer/getProduct', {
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    }).then((res) => {
      setDatas(res.data)
    }).catch(err => {
      console.log(err)
    })

    console.log(datas)

  }, [])


  const productsPerPage = 3;
  const pagesVisited = pageNumber * productsPerPage;


  const displayProducts = datas
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => (
      <div className="col-lg-4 col-md-4 col-sm-12 mt-5" >
        <div className="card" style={{ marginLeft: "40px", boxShadow: "20px 20px 80px -44px", transition: ".5s ease-in-out", cursor: "pointer", height: "480px", width: "400px" }}>
          <img src={product.image} className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p className="card-text">Description: {product.description}</p>
            <p className="card-text">Price: ${product.price}</p>
            <p className="card-text">Likes: {product.likes.length} <FavoriteIcon /></p>
            <p className="card-text">Organic: {product.organic ? "Yes" : "No"}</p>
            <Button variant='outlined' color='success' endIcon={<EditIcon />} onClick={() => handleEdit(product._id)} style={{ marginRight: "20px" }}>Edit</Button>
            <Button variant='outlined' color='error' endIcon={<DeleteIcon />} onClick={() => handleDelete(product._id)}>Delete</Button>
          </div>
        </div>
      </div>

    ));

  <div className="container mt-4 mb-5">
    <div className="row">{displayProducts}</div>
  </div>


  const pageCount = Math.ceil(datas.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    setCurrentPage(selected + 1);
  };
  const handleClose = () => {
    setOpen(false)
    setIsEditing(false)
    setData({
      name: "",
      price: "",
      category: "",
      description: "",
      quantity: "",
      productionDate: "",
      organic: "",
      image: "string"
    })
  }

  return (
    <>
      <Box sx={{ backgroundColor: '#F7F7F7', height: 55, p: 2, border: '1px solid #E3E3E3', paddingLeft: 5 }}>
        <div role="presentation" >
          <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 14 }} >
            <Typography>
              Account
            </Typography>
            <Typography color="text.primary">Farmer</Typography>
          </Breadcrumbs>
        </div>
      </Box>
      {deletedUserId && (
        <Alert severity="success" onClose={() => setDeletedUserId(null)}>
          <AlertTitle>Produit supprimé</AlertTitle>
          Produit  supprimé avec succès !
        </Alert>
      )}
      <Dialog open={open} onClose={handleClose}>
      {loading &&(
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >

      <HashLoader color="#9bc452" />
      </Backdrop>
      )}
        <DialogTitle id="form-dialog-title">
          {isEditing ? 'Edit Product' : 'Add Product'}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <AiOutlineClose />
          </IconButton>
        </DialogTitle>
        <Container maxWidth="md" style={{ paddingTop: "20px" }}>
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
                <Grid item xs={12}>
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
                      id="organic"
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
              <Grid display={'flex'} justifyContent={'end'}>
                <Button type="submit" style={{ marginTop: "20px" }}>
                  {isEditing ? <EditIcon /> : <AddIcon />}
                  {isEditing ? 'Update' : 'Add'}
                </Button>
                <Button

                  style={{ marginTop: "20px" }}
                  onClick={handleClose}
                >
                  Back
                </Button>
              </Grid>
            </Paper>
          </form>
        </Container>
      </Dialog>

      <Grid container sx={{ marginBottom: "10px", marginTop: "10px", justifyContent: 'flex-end', alignItems: 'center' }}>
        <Grid item>
          <ButtonGroup color='success' variant="text" aria-label="outlined primary button group">
            <Button sx={{ fontWeight: 'bold' }} startIcon={<AddIcon />} onClick={() => setOpen(true)}>
              Add Product
            </Button>
            <Button sx={{ fontWeight: 'bold' }} startIcon={<CalendarMonthIcon />} onClick={() => history.push('/farmer/calendar')}>
              Calendar
            </Button>
            <Button sx={{ fontWeight: 'bold' }} startIcon={<PsychologyIcon />} onClick={() => { setCartAi(true) }}>Ai Agricilture</Button>
          </ButtonGroup>
        </Grid>
      </Grid>


      <div>
        <Grid container spacing={2}>
          {displayProducts}
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10
          }}
        >
          <ReactPaginate className='react-paginate'
            previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
            nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
            onPageChange={changePage}
            containerClassName={'pagination'}
            previousLinkClassName={'previous-page'}
            nextLinkClassName={'next-page'}
            disabledClassName={'pagination-disabled'}
            activeClassName={'pagination-active'}
            pageCount={pageCount}
          />
          <div
            className="page-count"
            style={{
              marginLeft: '10px',
              marginRight: '10px',
            }}
          >
            Page {currentPage} of {pageCount}
          </div>
        </Box>
      </div>
      {cartAi && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <Grid container spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center" >
            <Grid marginRight={3} >
              <Card sx={{ maxWidth: 345 }} onClick={()=>{history.push('/farmer/crop')}}>
                <CardActionArea >
                  <CardMedia
                    component="img"
                    height="200"
                    image={require('../assets/images/cropCard.png')}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                     Crop Recommender
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Analyse data related to crops and their growing conditions with AI.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid marginRight={3}>
              <Card sx={{ maxWidth: 345 }} onClick={()=>{history.push('/farmer/fertilizer')}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={require('../assets/images/fertilizerCard.png')}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Fertilizer Recommender
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create a predictive model that recommends the best fertilizer type with AI.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>

        </Backdrop>
      )}


    </>
  )
}


export default Farmer