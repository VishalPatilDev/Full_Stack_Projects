import { useState } from 'react'

import './App.css'


import { Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import ProductForm from './components/ProductForm'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Courses from './components/Courses'
import Navbar2 from './components/Navbar2'
import Cart from './components/Cart'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'

function App() {
  const [count, setCount] = useState(0)







  return (
    <>
      <div className='bg-black h-screen '>
        <Navbar></Navbar>
        <Navbar2></Navbar2>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/addproduct' element={<ProductForm ></ProductForm>}></Route>
          <Route path='/contact' element={<Contact ></Contact>}>
            <Route path='home' element={<Home></Home>}></Route>
            <Route path='addproduct' element={<ProductForm></ProductForm>}></Route>
          </Route>
          <Route path='/signUp' element={<SignUpForm></SignUpForm>}></Route>
                    <Route path='/login' element={<LoginForm></LoginForm>}></Route>

          <Route path='/courses' element={<Courses></Courses>}></Route>
                    <Route path='/courses/:id' element={<Contact></Contact>}></Route>

          <Route path='*' element={<NotFound></NotFound>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>

        </Routes>
        <Footer className=''></Footer>
      </div>






    </>
  )
}

export default App
