import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar2 = () => {
    const navigate  = useNavigate()


  return (
    <div className=' bg-cyan-900 h-10 w-full flex  justify-between  px-5  '>
        <button onClick={()=>{
            navigate(-1)
        }} className='bg-blue-300 rounded flex justify-center font-bold px-2 py-2'>Back</button>
        <button onClick={()=>{
            navigate('/')
        }} className='bg-blue-300 rounded flex justify-center font-bold px-2 py-2' >Return to Home</button>
        <button onClick={()=>{
            navigate(+1)
        }} className='bg-blue-300 rounded flex justify-center font-bold px-2 py-2'>Next</button>
      
    </div>
  )
}

export default Navbar2
