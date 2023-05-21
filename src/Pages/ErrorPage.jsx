import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const { data, status, statusText } = useRouteError()
    const navigate = useNavigate()

  return (
    <div className='flex place-content-center place-items-center h-[800px] bg-slate-50'>
        <div className='flex flex-col gap-4 p-16 bg-slate-50 rounded-md border-red-700 border text-lg'>
            <span className='text-4xl font-extrabold'>Oops!</span>
            <span>Sorry, an unexpected error has occured.</span>
            <span className='text-gray-600 font-semibold'>{status + ' - ' + statusText}</span>
            <span className='text-red-600 font-semibold'>{data}</span>
            <button className='mt-2 p-3 rounded-md border-transparent border-2 bg-blue-950 text-white transition-all hover:bg-white hover:text-inherit hover:border-2 hover:border-black' onClick={() => navigate(-1)}>Go Back</button>
        </div>
    </div>
  )
}
