import React from 'react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { options } from '../api/auth/[...nextauth]/options'

const LoginPage = async() => {

  return (
      <div className='flex flex-col justify-center h-[90vh] items-center'>
          <div className=' p-8 rounded-lg shadow-lg flex flex-col w-[50%] h-[400px] justify-center items-center gap-8 border-2'>
          <h1 className='text-2xl font-bold'>Log Into Your Account</h1>
        <Link className='w-full' href="/api/auth/signin">
            <button className='p-4 w-full rounded-lg font-bold text-white bg-blue-500 '>
              <p>Log In with Google</p>
            </button>
        </Link>
          </div>
        
    </div>
  )
}

export default LoginPage