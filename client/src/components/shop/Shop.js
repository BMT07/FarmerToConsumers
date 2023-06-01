

import { useSelector } from 'react-redux';
import { Product } from '../home/product/Product';

function Shop() {
  const products = useSelector(state => state.productReducer.Product);
  return (
        <Product products={products}/>
  )
}

export default Shop