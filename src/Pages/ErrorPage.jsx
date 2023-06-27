import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const { data, status, statusText, message } = useRouteError()
    const navigate = useNavigate()

  return (
    <div className='flex place-content-center place-items-center h-screen bg-slate-50 dark:bg-slate-800 dark:text-slate-300'>
        <div className='flex flex-col gap-4 p-16 bg-slate-50 rounded-md border-red-700 border text-lg dark:bg-slate-800'>
            <span className='text-4xl font-extrabold'>Oops!</span>
            <span>Sorry, an unexpected error has occured.</span>
            <span>Refresh the page or go back to the last page.</span>
            <span className='text-gray-600 font-semibold dark:text-gray-400'>{status && (status + ' - ' + statusText)}</span>
            <span className='text-red-600 font-semibold'>{data ?? message}</span>
            <button className='mt-2 p-3 rounded-md border-transparent border-2 bg-blue-800 text-white transition-all hover:bg-blue-500' onClick={() => navigate(-1)}>Go Back</button>
        </div>
    </div>
  )
}
