import React from 'react'

const page = async ({ params }) => {

  // console.log(await params)
  const { userId } = await params;

  return (
    <div className='flex items-center justify-center
     h-screen bg-black'>
      <h1 className='text-white text-4xl'>
        USER PROFILE OF :
        <span className='bg-orange-600 text-white p-4 m-5'>
          {userId}</span>
          </h1>
    </div>
  )
}

export default page