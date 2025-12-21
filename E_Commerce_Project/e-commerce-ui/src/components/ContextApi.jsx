import React, { createContext, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export const GlobalContext = createContext()

const ContextApi = (props) => {
  const BASE_URL = 'http://localhost:8080/e-commerce'
  const [token, setToken] = useState(localStorage.getItem('token') || null);



  const [products, setProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState('');
  const [productId, setProductId] = useState(-1)
  const productData = {
    productName, productDescription, productPrice, productImage
  }

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Token being sent:", token);
      setCartProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
      setCartProducts([]);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);


  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/e-commerce',{
        headers: { Authorization: `Bearer ${token}` }
      })
    console.log(response.data)
    setProducts(response.data)
  }



  return (
    <div>
      <GlobalContext.Provider value={{ products, setProducts, fetchData, productName, productDescription, setToken,productImage, fetchCart, productPrice, setProductDescription, setProductImage, setProductName, setProductPrice, BASE_URL, cartProducts, setCartProducts }}>
        {props.children}
      </GlobalContext.Provider>
    </div>
  )
}

export default ContextApi
