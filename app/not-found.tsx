'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className='p-4 text-red-700 text-3xl w-full h-screen flex flex-col items-center justify-center'>
      <h1 className='text-center bg-white rounded-md py-5 w-full animate-pulse'>Not Found 404 page</h1>
      <button onClick={()=>router.back()}>Back</button>
    </div>
  )
}
