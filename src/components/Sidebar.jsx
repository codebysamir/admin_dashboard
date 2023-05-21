import { ShoppingBagOutlined, LocalShipping, ChatBubbleOutline, DynamicFeed, MailOutline, PersonOutline, Report, Storefront, TrendingDownOutlined, TrendingUpOutlined, WebOutlined, WorkOutline, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='bg-slate-50 flex-none w-60 fixed h-screen p-4'>
        <div className='p-4'>
            <h3 className='text-gray-600 font-semibold text-sm'>Dashboard</h3>
            <div className='flex flex-col'>
                <Link to={'/'}>
                    <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                        <WebOutlined className='text-blue-800' />
                        <span>Home</span>
                    </span>
                </Link>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <TrendingDownOutlined className='text-blue-800' />
                    <span>Analytics</span>
                </span>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <TrendingUpOutlined className='text-blue-800' />
                    <span>Sales</span>
                </span>
            </div>
        </div>
        <div className='p-4'>
            <h3 className='text-gray-600 font-semibold text-sm'>Quick Menu</h3>
            <div className='flex flex-col'>
                <Link to={'/users'}>
                    <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                        <PersonOutline className='text-blue-800' />
                        <span>Users</span>
                    </span>
                </Link>
                <Link to={'/products'}>
                    <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                        <Storefront className='text-blue-800' />
                        <span>Products</span>
                    </span>
                </Link>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <ShoppingBagOutlined className='text-blue-800' />
                    <span>Orders</span>
                </span>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <LocalShipping className='text-blue-800' />
                    <span>Deliveries</span>
                </span>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <ShoppingCartOutlined className='text-blue-800' />
                    <span>Carts</span>
                </span>
            </div>
        </div>
        <div className='p-4'>
            <h3 className='text-gray-600 font-semibold text-sm'>Notifications</h3>
            <div className='flex flex-col'>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <MailOutline className='text-blue-800' />
                    <span>Mail</span>
                </span>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <DynamicFeed className='text-blue-800' />
                    <span>Feedback</span>
                </span>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <ChatBubbleOutline className='text-blue-800' />
                    <span>Messages</span>
                </span>
            </div>
        </div>
        <div className='p-4'>
            <h3 className='text-gray-600 font-semibold text-sm'>Staff</h3>
            <div className='flex flex-col'>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <WorkOutline className='text-blue-800' />
                    <span>Manage</span>
                </span>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <TrendingDownOutlined className='text-blue-800' />
                    <span>Analytics</span>
                </span>
                <span className='p-2 hover:bg-slate-300 hover:rounded-lg cursor-pointer flex gap-2'>
                    <Report className='text-blue-800' />
                    <span>Reports</span>
                </span>
            </div>
        </div>
    </div>
  )
}
