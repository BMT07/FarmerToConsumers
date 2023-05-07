import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { hero } from "../../assets/data/data"
import { Product } from "../product/Product";
//import { products } from "../../assets/data/data"
import { Heading } from "../../common/Heading"


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

  useEffect(() => {
console.log(result)
  }, [])
  
  return (
    <>
    <div className='head'>
            <Heading title='Top Farmers' desc='The most successful farmers of the week in terms of sales.' />
          </div>
      <section className='cards'>
        {mergedList.map((item,index) => (
          <div className='card' key={index}>
            <div className='left'>
             
                  <img src={item.image} alt='' />
              
            </div>
            <div className='right'>
              <h4>{item.farmer}</h4>
              <p>{item.count} products</p>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
