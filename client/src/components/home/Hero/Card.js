import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { hero } from "../../assets/data/data"
import { Product } from "../product/Product";
//import { products } from "../../assets/data/data"
import { Heading } from "../../common/Heading"
import { Grid } from "@mui/material";



export const Card = () => {
  const products=useSelector(state=>state.productReducer.Product);

const counts = products.reduce((acc, { farmer }) => {
    acc[farmer] = (acc[farmer] || 0) + 1;
    return acc;
  }, {});
const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
const topFiveCounts  = sortedCounts.slice(0, 5);
const result = topFiveCounts.map(([farmer, count]) => ({ farmer, count }));

const images=hero.map(e=>e.cover)
const mergedList = result.map((item, index) => {
  return { ...item, image: images[index] };
});

  return (
    <>
    <div className='head'>
            <Heading title='Top Farmers' desc='The most successful farmers of the week in terms of sales.' />
          </div>
      <section className='cards'>
        {mergedList.map((item,index) => (
          <div  className='card' key={index}>
            <Grid container spacing={0}>
              <Grid item xs={6} md={4}>
              
             
             <img src={item.image} alt='' />
         
       
              </Grid>
              <Grid item xs={6} md={8}>
              
              <h5>{item.farmer}</h5>
              <p>{item.count} products</p>
            
              </Grid>
            </Grid>
           
            
          </div>
        ))}
      </section>
    </>
  )
}
