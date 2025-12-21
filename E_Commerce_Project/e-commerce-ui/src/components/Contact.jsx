import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
const Contact = () => {
  const params = useParams();
  console.log(params);
  return (
    

    <>
    <div className='text-lg text-white font-bold  flex justify-center'>
      {/* Contact Page
       */}
       <Link to={'/contact/home'}>Home</Link>
       <Link to={'/contact/addproduct'}>Product</Link>
       
    </div>
    <Outlet></Outlet>
    </>
    
  )
}

export default Contact
