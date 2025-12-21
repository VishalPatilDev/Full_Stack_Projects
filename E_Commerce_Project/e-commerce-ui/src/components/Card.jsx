import axios from 'axios'
import { GlobalContext } from './ContextApi'
import { useContext } from 'react'
import { useState } from 'react'
import { PackagePlus } from 'lucide-react'
const Card = (props) => {

  const { fetchData, BASE_URL, cartProducts, setCartProducts, fetchCart,token } = useContext(GlobalContext)
  const [flag, setFlag] = useState(false)
  const [localData, setLocalData] = useState({
    productName: props.productName,
    productDescription: props.productDescription,
    productPrice: props.productPrice,
    productImage: props.productImage,
  });


  // const qty = 1;
  // const CartItem = {productId: props.id,quantity:qty}



  const addToCart = async () => {
    try {
      const CartItem = { productId: props.id, quantity: 1 }
      const response = await axios.post(`${BASE_URL}/addToCart`, CartItem, {
        headers: { Authorization: `Bearer ${token}` }
      })

      fetchCart();
      console.log("Product Added to Cart !");
      alert("Product " + CartItem.productId + " Added !")
      console.log(response.data)
    } catch (e) {
      console.log(e);
      alert("Failed to Add to Cart !")
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(BASE_URL + '/updateProduct' + '/' + `${props.id}`, localData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setFlag(false)
      fetchData()
    } catch (e) {
      console.log(e)
      alert('Failed')
    }
  }
  const deleteProduct = async (id) => {
    const response = axios.delete(`http://localhost:8080/e-commerce/deleteProductById/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
      })
    console.log("Product " + response.data + " deleted !")
    alert("Product Deleted !")
  }
  return (

    <div className='bg-gray-600 w-64 h-80 rounded  p-2' >
      {!flag ? (
        <>
          <div
            className='h-53  bg-center  bg-cover   '
            style={{ backgroundImage: `url(${props.productImage})` }}
          >
            <div className='bg-amber-400 rounded-full h-10 w-10 flex items-center justify-center '>
              <h1 className='text-3xl font-bold'>{props.id}</h1>
            </div>


            <h1 className='text-3xl font-bold'>
              {props.productName}
            </h1>
            <p className='text-lg  text-gray-950 opacity-70'>
              {props.productDescription}
            </p>
            <p className='text-2xl font-bold'>
              Rup:{props.productPrice}
            </p>


          </div>
          <div className='flex gap-3 py-7 justify-center'>
            <div className=' bg-red-400 rounded h-10 w-20 flex justify-center'>
              <button onClick={() => {
                deleteProduct(props.id)
                fetchData()
              }}>Delete</button>
            </div>
            <div className=' bg-green-400 rounded h-10 w-20 flex justify-center  active:scale-90'>
              <button className='' onClick={() => {
                setFlag(true)
              }}>Update</button>

            </div>
            <div className='h-10 w-10 rounded-full bg-amber-100 flex justify-center items-center active:scale-85  ' onClick={() => {
              // cartProducts.push(localData)
              // console.log(cartProducts)
              // setCartProducts(cartProducts)
              addToCart();
            }}>
              <PackagePlus></PackagePlus>
            </div>
          </div>
        </>)
        : (
          <>
            <div className='px-6  flex flex-wrap gap-2 justify-center items-center'>
              <form className='flex flex-wrap gap-1' onSubmit={(e) => { updateProduct(e) }}>
                <label >Product Name :</label>
                <input className='border-2 rounded ' type="text" value={localData.productName} onChange={(e) => { setLocalData({ ...localData, productName: e.target.value }) }} />
                <label >Product Description :</label>
                <input className='border-2 rounded ' type="text" value={localData.productDescription} onChange={(e) => { setLocalData({ ...localData, productDescription: e.target.value }) }} />
                <label >Product Price :</label>
                <input className='border-2 rounded ' type="text" value={localData.productPrice} onChange={(e) => { setLocalData({ ...localData, productPrice: e.target.value }) }} />
                <label >Product Image :</label>
                <input className='border-2 rounded ' type="text" value={localData.productImage} onChange={(e) => { setLocalData({ ...localData, productImage: e.target.value }) }} />
                <button className='bg-blue-400 rounded  text-white active:scale-90' type="submit"><h1 className='text-lg font-bold flex justify-center'>Update Product</h1></button>

              </form>
              <div><button className='bg-blue-400 rounded  text-white active:scale-90' onClick={() => { setFlag(false) }}><h1 className='text-lg font-bold flex justify-center'>Back</h1></button>
              </div>

            </div>

          </>
        )}
    </div>


  )
}

export default Card
