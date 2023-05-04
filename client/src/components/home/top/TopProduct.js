import { Grid } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../../controller/ProductAction"
//import { topProducts } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import { ProductItems } from "../product/ProductItems"

export const TopProduct = () => {
  const products = useSelector(state => state.productReducer.Product);
  const dispatch = useDispatch()
  const sortedProducts = products.length > 0
    ? [...products].sort((a, b) => b.likes.length - a.likes.length)
    : [];

  const topProducts = sortedProducts.slice(0, 6);
  const [cartItems, setCartItems] = useState(topProducts)
  const Like = async (id) => {
    await axios.put("http://localhost:8080/FarmerToConsumer/Like", { _id: id },{
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
  const unLike = async (id) => {
    await axios.put("http://localhost:8080/FarmerToConsumer/unlike", { _id: id },{
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
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [cartItems])

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <p></p>
      </Grid>
      <Grid item md={8} xs={4}>
        <div className='container'>
          <div className='head'>
            <Heading title='Top Selling Products' desc='Meet our newbies! The latest templates uploaded to the marketplace.' />
          </div>
          <Grid container item >
            <ProductItems cartItems={cartItems.length===0?topProducts:cartItems} Like={Like} unLike={unLike} />
          </Grid>
        </div>
      </Grid>
      <Grid item xs>
        <p></p>
      </Grid>
    </Grid>
  )
}
