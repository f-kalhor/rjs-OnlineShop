import React from 'react'
import { useProducts } from '../contextData/ProductsContext'

function Products() {
  const products=useProducts()
  console.log(products);
  
  return (
    <div>
      
    </div>
  )
}

export default Products
