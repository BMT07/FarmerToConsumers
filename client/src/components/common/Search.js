import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Product } from '../home/product/Product';
import { Heading } from './Heading';

function Search() {
    const { name } = useParams();
    const[product,setProducts]=useState([])
    const getProducts=()=>{
        const products=axios.get('http://localhost:8080/FarmerToConsumer/searchProducts/'+name)
        .then((res)=>setProducts(res.data))
        .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        getProducts();
        console.log("ffffff")
    },[])
  return (
   product.length ?(<Product products={product}/> ): (
   <div>
    <div className='head'>
            <Heading title='No results found !' desc='Please search for an existing item or try refining your search criteria.' />
          
    <img style={{width:'70%',display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',marginTop:-10}} src={require('../assets/images/123456.png')} alt='not found'/>
    </div>
    </div>)
    
  )
}

export default Search