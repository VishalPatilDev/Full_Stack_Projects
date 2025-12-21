import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from './Card'
import { ShoppingCart } from 'lucide-react';
import { GlobalContext } from './ContextApi';

const Navbar = () => {
const {token}=useContext(GlobalContext)

    const [productName, setProductName] = useState('')
    const [product, setProduct] = useState(null)
    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/e-commerce/getProductByName', {
                params: { productName },
                
        headers: { Authorization: `Bearer ${token}` }
      
            })
            console.log("Product " + response.data + " Got")
            setProduct(response.data)
            alert("Product Found !")
        } catch (e) {
            console.log(" Error : " + e)
            alert("Failed !")
        }
    }
    return (
        <>
            <div className='top-0 bg-cyan-900 h-20 w-full flex items-center justify-around text-white '>
                <div>
                    <h1 className='text-5xl flex justify-center items-center'>E-COMMERCE</h1>
                </div>
                <div className='flex gap-2'>
                    <div >
                        <form onSubmit={(e) => { submitHandle(e) }}>
                            <input className=' rounded-full border-2 p-1 ' type="text" placeholder='Search' value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                            <button className='bg-blue-400 rounded-full h-10 w-20 text-white ' type="submit"><h1 className='text-lg font-bold flex justify-center'>Search</h1></button>

                        </form>
                    </div>
                </div>
                <div className='flex gap-8'>
                    <Link className='text-lg flex justify-center items-center' to={'/'}>Home</Link>
                    <Link className='text-lg flex justify-center items-center' to={'/addproduct'}>AddProduct</Link>

                    <Link className='text-lg flex justify-center items-center' to={'/contact'}>Contact</Link>
                    <Link className='text-lg flex justify-center items-center' to={'/courses'}>Courses</Link>
                    <Link className='text-lg flex justify-center items-center' to={'/signUp'}>SignUp</Link>
                                        <Link className='text-lg flex justify-center items-center' to={'/login'}>Login</Link>

                </div>
                <Link to={'/cart'}><ShoppingCart className='active:scale-70' onClick={() => { }} /></Link>

            </div>
            <div className="mt-4 flex justify-center bg-amber-100">
                {product && <Card productName={product.productName} productDescription={product.productDescription} id={product.id} productImage={product.productImage} />}
            </div>
        </>
    )
}

export default Navbar
