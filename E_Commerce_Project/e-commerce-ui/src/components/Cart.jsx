import React, { useContext, useState } from 'react'
import { GlobalContext } from './ContextApi'
import Card from './Card'
import { DeleteIcon, Plus } from 'lucide-react'
import axios from 'axios'

const Cart = () => {
  const { cartProducts, BASE_URL, fetchCart,token } = useContext(GlobalContext)
  const addQuantity = async (elem) => {
    try {

      const newQty = elem.quantity + 1
      await axios.put(`${BASE_URL}/cartItem/${elem.cartItemId}/quantity`, null, {
        params: { quantity: newQty },
        headers: { Authorization: `Bearer ${token}` }
      })
      await fetchCart();
      // alert("Quantity Updated !")
      console.log("Quantity Updated !")
    } catch (e) {
      console.log(e)
      alert("Failed to update Quantity !")
    }
  }

  const removeFromCart = async(elem)=>{
    try{
      const response = await axios.delete(`${BASE_URL}/deleteCartItem/${elem.cartItemId}`,{headers: { Authorization: `Bearer ${token}` }})
      console.log(response.data)
      alert("Deleted ")
      fetchCart()
    }catch(e){
      console.log(e)
      alert("Product Removed !")
    }
  }


  return (
    <div className='p-6 bg-gray-900 min-h-screen '>
      <h1 className="text-white text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>

      <div className="flex space-x-6 overflow-x-auto pb-3 ">

        {cartProducts.map((elem, idx) => (
          // <Card key={idx} id={elem.id} productName={elem.productName} productDescription={elem.productDescription} productPrice={elem.productPrice} productImage={elem.productImage}></Card>
          <>
            <div key={elem.cartItemId} className='flex flex-wrap rounded shrink-0 w-60 bg-amber-50' >

              <div
                className='h-53  bg-center  bg-cover'
                style={{ backgroundImage: `url(${elem.productImage})` }}
              >
                <div className='bg-amber-400 rounded-full h-10 w-10 flex items-center justify-center '>
                  <h1 className='text-3xl font-bold'>{idx + 1}</h1>
                </div>


                <h1 className='text-3xl font-bold'>
                  {elem.productName}
                </h1>
                <p className='text-lg  text-gray-950 opacity-70'>
                  {elem.productDescription}
                </p>
                <p className='text-2xl font-bold'>
                  Rup:{elem.productPrice}
                </p>
                <div className='flex justify-between'>
                  <p className='text-2xl font-bold'>
                    QTY:{elem.quantity}
                  </p>
                  <div className=' ml-2 bg-red-400 rounded-full h-10 w-10 flex justify-center active:scale-75'>
                    <button onClick={() => {
                      addQuantity(elem)
                    }}><Plus className='text-white'></Plus></button>
                  </div>
                   <div className=' ml-2 bg-red-400 rounded-full h-10 w-10 flex justify-center active:scale-75'>
                    <button onClick={() => {
                      removeFromCart(elem);
                    }}><DeleteIcon className='text-white'></DeleteIcon></button>
                  </div>
                </div>



              </div>
              {/* <div className='flex gap-3 py-7 justify-center'>
              <div className=' bg-red-400 rounded h-10 w-20 flex justify-center'>
              <button onClick={() => {
                deleteProduct(elem.id)
                fetchData()
              }}>Delete</button>
            </div>
            <div className=' bg-green-400 rounded h-10 w-20 flex justify-center  active:scale-90'>
              <button className='' onClick={() => {
                setFlag(true)
              }}>Update</button>
              
            </div>
            
            </div> */}
            </div>

          </>
        ))}
      </div>
    </div>
  )
}

export default Cart
