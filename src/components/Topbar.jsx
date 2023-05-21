import { DarkModeOutlined, LanguageOutlined, NotificationAddTwoTone, Settings } from '@mui/icons-material'
import React from 'react'

export default function Topbar() {
  return (
    <div className='flex justify-between p-6 sticky top-0 bg-white z-50'>
        <div>
            <h1 className='font-bold text-3xl text-blue-800'>Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
            <div className='flex items-center cursor-pointer'>
                <DarkModeOutlined />
            </div>
            <div className='flex items-center cursor-pointer'>
                <NotificationAddTwoTone />
                <span className="inline-flex place-content-center place-items-center bg-red-700 rounded-full w-5 h-5 abolute mb-4 -ml-4">
                    <span className='relative text-white'>2</span>
                </span>
            </div>
            <div className='flex items-center cursor-pointer'>
                <LanguageOutlined />
                <span className="inline-flex place-content-center place-items-center bg-red-700 rounded-full w-5 h-5 abolute mb-4 -ml-4">
                    <span className='relative text-white'>2</span>
                </span>
            </div>
            <div className='flex items-center cursor-pointer'>
                <Settings />
            </div>
            <div>
                <img src='https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='w-12 rounded-full cursor-pointer' />
            </div>
        </div>
    </div>
  )
}
