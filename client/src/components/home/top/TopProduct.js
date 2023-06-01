import { Grid } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../../controller/ProductAction"
//import { topProducts } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import { ProductItems } from "../product/ProductItems"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

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
  

  const slideInLeft = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
        x: -200,
      },
      {
        opacity: 1,
        x: 0,
        delay: delay || 0.4,
        duration: duration || 0.6,
        scrollTrigger: {
          trigger: elem,
          start: "top center",
          end: "bottom center"
        }
      }
    )
  }

  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [cartItems])

  useEffect(()=>{
    slideInLeft("#box1");
  },[])
  return (
    <section id="box1" >
    <Grid container spacing={1}>
     <Grid item md={2}></Grid>
      <Grid item md={8} xs={12}>
        <div  className='container'>
          <div className='head'>
            <Heading title='Top Selling Products' desc='Meet our newbies! The latest templates uploaded to the marketplace.' />
          </div>
          <Grid container item >
            <ProductItems cartItems={cartItems.length===0?topProducts:cartItems} Like={Like} unLike={unLike} />
          </Grid>
        </div>
      </Grid>
      
    </Grid>
    </section>
  )
}
