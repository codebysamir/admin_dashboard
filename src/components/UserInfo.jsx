import { AdminPanelSettings, EditOutlined, HomeOutlined, LocalPhone, MailOutline, PersonOutline, PublicOutlined, TagOutlined } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function UserInfo({ user }) {

    console.log(user)
  return (
    <div className='flex flex-col gap-8 p-8 min-w-96 shadow-2xl rounded-lg flex-grow'>
        <div className='flex justify-between'>
            <h2 className='text-gray-600 font-bold text-4xl'>{user?.username}</h2>
            {(!location.pathname.includes('edit') && location.pathname.includes('user')) &&
            <Link to={'/edit-user/' + user?._id}>
                <EditOutlined titleAccess='Edit' className='cursor-pointer text-blue-800 dark:text-blue-500' />
            </Link>}
        </div>
        <div className='flex justify-around flex-wrap flex-grow'>
            <div className='flex flex-shrink-0'>
                <img className='w-60 h-60 object-cover rounded-full' src={user?.img} alt="" />
            </div>
            <div className='flex flex-col gap-4'>
            <h4 className='font-bold text-gray-500 text-xl'>Account Details</h4>
                <div className='flex gap-2'>
                    <TagOutlined className='text-blue-800 dark:text-blue-500' />
                    <span>{user?._id}</span>
                </div>
                <div className='flex gap-2'>
                    <MailOutline className='text-blue-800 dark:text-blue-500' />
                    <span>{user?.email}</span>
                </div>
                <div className='flex gap-2'>
                    <LocalPhone className='text-blue-800 dark:text-blue-500' />
                    <span>+123 456 4789</span>
                </div>
                <div className='flex gap-2'>
                    <HomeOutlined className='text-blue-800 dark:text-blue-500' />
                    <span>Schaffhauserfakestrasse 123<br/> 8050 Zürich</span>
                </div>
                <div className='flex gap-2'>
                    <PublicOutlined className='text-blue-800 dark:text-blue-500' />
                    <span>Schweiz</span>
                </div>
                <div className='flex gap-2'>
                    <AdminPanelSettings className='text-blue-800 dark:text-blue-500' />
                    <span>{user?.isAdmin ? 'Admin' : 'User'}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
