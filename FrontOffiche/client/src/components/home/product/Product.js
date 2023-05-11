import { Backdrop, Button, FormControl, FormHelperText, MenuItem, Select, Stack } from "@mui/material";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, LikeProducts, unLikeProducts } from "../../../controller/ProductAction";
//import { products } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import { ProductItems } from "./ProductItems"
import axios from "axios"

import { Grid } from '@mui/material';
import Category from "../../shop/Category";
import ReactPaginate from 'react-paginate';
import { HashLoader } from "react-spinners"


export const Product = () => {
  const[loading,setLoading]=useState(true)
  const products = useSelector(state => state.productReducer.Product);
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch();
  const Like = async (id) => {
    await axios.put("http://localhost:8080/FarmerToConsumer/Like", { _id: id }, {
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    }).then(result => {
      console.log(result)
      const newData = cartItems.map(item => {
        if (item._id === result.data._id) {
          return result.data
        } else {
          return item
        }
      })
      setCartItems(newData)
      console.log(cartItems)
    })
      .catch((error) => console.log(error))
    console.log("like" + id)
  }



  useEffect(() => {
    dispatch(fetchProducts())
    .then(() => {
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, [cartItems])



  const unLike = async (id) => {
    await axios.put("http://localhost:8080/FarmerToConsumer/unlike", { _id: id }, {
      headers: { Authorization: `${localStorage.getItem('jwt')}` }
    }).then(result => {
      console.log(result)
      const newData = cartItems.map(item => {
        if (item._id === result.data._id) {
          return result.data
        } else {
          return item
        }
      })
      setCartItems(newData)
    })
      .catch((error) => console.log(error))
    console.log("unlike" + id)
  }


  const handleChange = (e) => {
    const value = e.target.value;
    if (value === 'az') {
      const sorted = [...products].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCartItems(sorted);
    } else if (value === 'za') {
      const sorted = [...products].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setCartItems(sorted);
    }
    else if (value === "pc") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setCartItems(sorted);
    }
    else {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      setCartItems(sorted);
    }
  }
  const filterFruits = () => {
    const fruits = products.filter(prod => prod.category === "Fruits")
    setCartItems(fruits)
  }
  const filterVegetables = () => {

    const Vegetables = products.filter(prod => prod.category === "Vegetables")
    setCartItems(Vegetables)
  }
  const filterGrains = () => {
    const Grains = products.filter(prod => prod.category === "Grains")
    setCartItems(Grains)
  }
  const filterDairyP = () => {
    const DairyP = products.filter(prod => prod.category === "Dairy Products")
    setCartItems(DairyP)
  }
  const filterMeatAndEggs = () => {
    const MeatAndEggs = products.filter(prod => prod.category === "Meats and Eggs")
    setCartItems(MeatAndEggs)
  }
  const All = () => {
    setCartItems(products)
  }
  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const currentProducts = cartItems.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  return (
    <>
      <Heading title='All Products' desc='Check the hottest designs of the week. These rising stars are worth your attention.' />
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 10 }}>

        <Category
          filterFruits={filterFruits}
          filterVegetables={filterVegetables}
          filterGrains={filterGrains}
          filterDairyP={filterDairyP}
          filterMeatAndEggs={filterMeatAndEggs}
          All={All}
        />

        <Grid item xs={6}>
          <section className='product'>
            <div className='container'>
              <FormControl sx={{ m: 1, minWidth: 120, display: 'flex', alignItems: 'end' }}>
                <Select
                  defaultValue="nothing"
                  onChange={handleChange}
                  displayEmpty
                  size="small"
                  sx={{ width: 200 }}
                >
                  <MenuItem value="nothing">
                    <em>----</em>
                  </MenuItem>
                  <MenuItem value="pc">Prix Croissant</MenuItem>
                  <MenuItem value="pd">Prix Decroissant</MenuItem>
                  <MenuItem value="az"> De A à Z</MenuItem>
                  <MenuItem value="za">De Z à A</MenuItem>
                </Select>
                <FormHelperText>TRIER PAR </FormHelperText>
              </FormControl>

              <ProductItems cartItems={currentProducts.length === 0 ? products : currentProducts} Like={Like} unLike={unLike} />
            </div>
          </section>
        </Grid>
        <Grid container justifyContent={'center'} mt={10}>
          {/* <Pagination count={10} color="success" /> */}
          <ReactPaginate className="react-paginate"
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(cartItems.length / productsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
          />
        </Grid>

      </Grid>
      {loading &&(
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >

      <HashLoader color="#9bc452" />
      </Backdrop>
      )}
    </>
  )
}
