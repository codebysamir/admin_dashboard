import { AdminPanelSettings, EditOutlined, HomeOutlined, LocalPhone, MailOutline, PersonOutline, PublicOutlined } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function UserInfo() {
  return (
    <div className='flex flex-col gap-8 p-8 min-w-96 shadow-2xl flex-grow'>
        <div className='flex justify-between'>
            <h2 className='text-gray-600 font-bold text-4xl'>Will Smith</h2>
            <Link to={'/edit-user'}>
                <EditOutlined titleAccess='Edit' className='cursor-pointer text-blue-800' />
            </Link>
        </div>
        <div className='flex gap-8 flex-wrap flex-grow'>
            <div className='flex flex-shrink-0'>
                <img className='w-40 h-40 object-cover rounded-full' src="https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className='flex flex-col gap-4'>
            <h4 className='font-bold text-gray-500'>Account Details</h4>
                <div className='flex gap-2'>
                    <MailOutline className='text-blue-800' />
                    <span>willi@smith.com</span>
                </div>
                <div className='flex gap-2'>
                    <LocalPhone className='text-blue-800' />
                    <span>+123 456 4789</span>
                </div>
                <div className='flex gap-2'>
                    <HomeOutlined className='text-blue-800' />
                    <span>Schaffhauserfakestrasse 123<br/> 8050 Zürich</span>
                </div>
                <div className='flex gap-2'>
                    <PublicOutlined className='text-blue-800' />
                    <span>Schweiz</span>
                </div>
                <div className='flex gap-2'>
                    <AdminPanelSettings className='text-blue-800' />
                    <span>Is Admin: False</span>
                </div>
            </div>
        </div>
    </div>
  )
}
