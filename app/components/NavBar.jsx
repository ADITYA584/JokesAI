import React from 'react'
import Link from 'next/link'
import {getServerSession} from "next-auth"
import { options } from '../api/auth/[...nextauth]/options'

const NavBar = async() => {
    const session = await getServerSession(options)
    if (session) {
        console.log("session is there")
    }
  return (
      <div className='bg-blue-500 flex justify-between px-32 items-center'>
          <div>
              <h1 className='text-3xl font-bold text-white'>JokesAI</h1>
          </div>
          <div className='flex gap-10 text-white px-8 py-4  text-xl font-bold'>
              <Link href="/Mainapp">Main App</Link>
             
              {session?<Link href="/api/auth/signout?callbackUrl=/">Logout</Link>:<Link href="/api/auth/signin">Login</Link>}
          </div>
          
      </div>
  )
}

export default NavBar