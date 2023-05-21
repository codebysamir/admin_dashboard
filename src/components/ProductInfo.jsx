import { AttachMoney, CategoryOutlined, EditOutlined, DescriptionOutlined, InventoryOutlined } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductInfo() {
  return (
    <div className='flex flex-col gap-8 p-8 min-w-96 shadow-2xl flex-grow'>
        <div className='flex justify-between'>
            <h2 className='text-gray-600 font-bold text-4xl'>Sony Camera X2000</h2>
            <Link to={'/edit-product'}>
                <EditOutlined titleAccess='Edit' className='cursor-pointer text-blue-800' />
            </Link>
        </div>
        <div className='flex gap-8 flex-wrap flex-grow'>
            <div className='flex flex-shrink-0'>
                <img className='w-40 h-40 object-cover rounded-full' src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className='flex flex-col gap-4'>
                <h4 className='font-bold text-gray-500'>Product Details</h4>
                <div className='flex gap-2 max-w-xs max-h-36 overflow-y-auto flex-grow'>
                    <DescriptionOutlined className='text-blue-800' />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error assumenda consequatur, id laboriosam, dignissimos rerum consequuntur ullam distinctio necessitatibus consectetur laudantium adipisci nulla, numquam eius vero dolorem sapiente labore dicta?</p>
                </div>
                <div className='flex gap-2'>
                    <AttachMoney className='text-blue-800' />
                    <span>12</span>
                </div>
                <div className='flex gap-2'>
                    <CategoryOutlined className='text-blue-800' />
                    <span>Electronics, Gadgets</span>
                </div>
                <div className='flex gap-2'>
                    <InventoryOutlined className='text-blue-800' />
                    <span>In Stock: True</span>
                </div>
            </div>
        </div>
    </div>
  )
}
