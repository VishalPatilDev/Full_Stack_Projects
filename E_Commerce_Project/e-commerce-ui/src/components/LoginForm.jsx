import React, { useContext, useState } from 'react'
import { GlobalContext } from './ContextApi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const LoginForm = () => {
const { BASE_URL,setToken ,fetchCart} = useContext(GlobalContext)
const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const loginUserObj = {username,password}

    const submitHandle = async (e)=>{
      e.preventDefault();
      try{
      const response = await axios.post(`${BASE_URL}/auth/login`,loginUserObj,{
        headers : {'Content-Type' : 'application/json'},
        
      })
      localStorage.setItem('token', response.data);
       setToken(response.data);
    //    await fetchCart();
      console.log(response.data)
      alert("Logged In !")
      navigate('/cart');
    }catch(e)
    {
      console.log(e)
      alert("Failed to Login User !")
    }
  
    }
  return (
    <div className='py-10 bg-gray-700'>
        <h2 className='text-3xl font-bold flex justify-center text-white'>Add Product</h2>
        <form className='flex flex-wrap gap-3 text-white py-10 justify-center items-center' onSubmit={(e)=>{submitHandle(e)}}>
            <label className='text-2xl font-bold'>UserName : </label>
            <input className='border-2 rounded' type="text"  value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <label className='text-2xl font-bold'>Password : </label>
            <input className='border-2 rounded' type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type='submit' className='active:scale-80 bg-blue-300 px-4 py-2 rounded-full font-bold text-lg'>Login</button>
        </form>
      
    </div>
  )
}

export default LoginForm
