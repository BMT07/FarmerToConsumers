import React, { useEffect, useState } from "react"
import { Banner } from "./banner/Banner"
import { Blog } from "./blog/Blog"
import { Card } from "./Hero/Card"
import { Hero } from "./Hero/Hero"
import { Price } from "./price/Price"
import { Testimonial } from "./testimonial/Testimonial"
import { TopProduct } from "./top/TopProduct"
import { Product } from "./product/Product"
import Newsletter from "./newsletter/Newsletter"
import { useDispatch } from "react-redux"
import { fetchProducts } from "../../controller/ProductAction"
import { HashLoader } from "react-spinners"
import { Backdrop } from "@mui/material"

export const Home = () => {
  const[loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    .then(() => {
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, [])
  return (
    <>
      <Hero />
      <Card />
      <TopProduct/>
      <Price />
      <Testimonial />
      <Newsletter/>
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
