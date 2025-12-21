import React, { useContext, useState } from 'react'
import { GlobalContext } from './ContextApi'
import axios from 'axios'

const SignUpForm = () => {
  const { BASE_URL } = useContext(GlobalContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = { username, email, password }

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, user, {

        headers: { 'Content-Type': 'application/json' }

      })
      console.log(response.data)
      alert("Registered !")
    } catch (e) {
      console.log(e)
      alert("Failed to Register User !")
    }

  }

  return (
    <div className='py-10 bg-gray-700 '>
      <h2 className='text-3xl font-bold flex justify-center text-white'>Sign Up</h2>
      <form className='flex flex-wrap gap-3 text-white py-10 justify-center items-center' onSubmit={(e) => { submitHandle(e) }}>
        <label className='text-2xl font-bold'>Name : </label>
        <input className='border-2 rounded' type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <label className='text-2xl font-bold'>Email : </label>
        <input className='border-2 rounded' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <label className='text-2xl font-bold'>Password : </label>
        <input className='border-2 rounded' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button type='submit' className='active:scale-80 bg-blue-300 px-4 py-2 rounded-full font-bold text-lg'>SignUp</button>
      </form>

    </div>
  )
}

export default SignUpForm
