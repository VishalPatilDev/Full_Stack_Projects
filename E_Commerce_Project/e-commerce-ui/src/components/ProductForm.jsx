import React, { useContext } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { GlobalContext } from './ContextApi';

const ProductForm = () => {
    

  const {fetchData,token,productImage,productDescription,productName,productPrice,setProductDescription,setProductImage,setProductName,setProductPrice,BASE_URL} =useContext(GlobalContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    
    const productData = {
      productName,productDescription,productPrice,productImage
    }
    
    try{
      const response = await axios.post(BASE_URL,productData,{
        headers: { Authorization: `Bearer ${token}` }})
      console.log("Product Saved ",response.data)
      alert("Product " +response.data.productName+" Saved !")
      fetchData()
    }catch(e){
      console.log(e)
      alert("Failed !")
    }

  }
  return (
    <>
    <div className='bg-cyan-100 p-10 '>
      <div >
          <h2 className='text-3xl font-bold flex justify-center '>Add Product</h2>

        </div>
        <div className='p-10  '>
          <form className='flex flex-wrap gap-2' onSubmit={(e) => { submitHandler(e) }}>
            <label >Product Name :</label>
            <input className='border-2 rounded ' type="text" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
            <label >Product Description :</label>
            <input className='border-2 rounded ' type="text" value={productDescription} onChange={(e) => { setProductDescription(e.target.value) }} />
            <label >Product Price :</label>
            <input className='border-2 rounded ' type="text" value={productPrice} onChange={(e) => { setProductPrice(e.target.value) }} />
            <label >Product Image :</label>
            <input className='border-2 rounded ' type="text"   onChange={(e) => { setProductImage(e.target.value) }} />
            <button className='bg-blue-400 rounded h-10 w-30 text-white active:scale-90'  type="submit"><h1 className='text-lg font-bold flex justify-center'>Add Product</h1></button>
          </form>
        </div>
        <div className='text-white flex justify-center'>
                        

        </div>
        </div>
    </>
  )
}

export default ProductForm
