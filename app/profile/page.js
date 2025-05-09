'use client'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {

  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      console.log('Logout Successfull...')
      router.push('/login')
    } catch (error) {
      console.log('Logout Api error:', error)
    }
  }

  const getUserInfo = async () => {
    const response = await axios.get('/api/users/me')
    const user = response.data.Data
    console.log(user)
    router.push(`/profile/${user.Username}`)
  }

  return (
    <div className='flex flex-col items-center justify-center
     h-screen bg-black gap-5'>
      <h1 className='text-white text-4xl'>Welcome to Profile page</h1>


      <button onClick={getUserInfo}
        className='bg-blue-600 text-white px-4 py-2 rounded-xl'
      >Get User Info</button>

      <button onClick={logout}
        className='bg-green-600 px-4 py-2 rounded-xl'>
        LogOut</button>
    </div>
  )
}

export default page