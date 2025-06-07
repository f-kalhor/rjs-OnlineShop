import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/config'

const ProductsContext=createContext()

function ProductsProvider({children}) {
    const [products,setProducts]=useState([])

    useEffect(()=>{
        const axiosData=async()=>{
            const response=await api.get("/products")
            setProducts(response)
        }

        axiosData()
    },[])

  return (
    <ProductsContext.Provider value={products}>
        {children}
    </ProductsContext.Provider>
  )
}
 
const useProducts=()=>{
    const products=useContext(ProductsContext)
    return products;
}

export { ProductsProvider,useProducts}
