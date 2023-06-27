import { AttachMoney, CategoryOutlined, EditOutlined, DescriptionOutlined, InventoryOutlined, StraightenOutlined, PaletteOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {ProductContext } from '../hooks/ProductContext'
import { UserContext } from '../hooks/UserContext'
import UserInfo from './UserInfo'
import ProductInfo from './ProductInfo'

export default function OrderInfo({order}) {
    const location = useLocation()
    const { products, loading: loadingProd, error: errorProd } = useContext(ProductContext)
    const { getUserRequest, user, loading: loadingUser, error: errorUser } = useContext(UserContext)
    
    // console.log(orders)
    console.log(order)
    
    useEffect(() => {
        const controller = new AbortController()
        if (order) getUserRequest(controller, order?.userId)

        return () => controller.abort()
    }, [order])
    

  return (
    <div className='flex flex-col gap-12 p-8 min-w-96 flex-grow'>
        <div className='flex gap-4 p-4 rounded-lg'>
            {/* <img className='w-44 h-44' src={user?.img} /> */}
            <div className='flex flex-col shadow-2xl gap-4 w-fit p-8 rounded-lg flex-grow'>
                <div className='flex justify-between mb-4'>
                    <h2 className='max-w-xl text-gray-600 font-bold text-4xl whitespace-pre-line'>Order Details</h2>
                    {!location.pathname.includes('edit') &&
                    <Link to={'/edit-order/' + order?._id} state={order}>
                        <EditOutlined titleAccess='Edit' className='cursor-pointer text-blue-800' />
                    </Link>
                    }
                </div>
                {/* <h4 className='font-bold text-gray-500 text-xl'>User Details</h4> */}
                <div className='flex gap-4'>
                    <span className='font-semibold text-blue-800 uppercase dark:text-blue-500'>Order ID:</span>
                    <span>{order?._id}</span>
                </div>
                {order?.stripeId &&
                <div className='flex gap-4'>
                    <span className='font-semibold text-blue-800 uppercase dark:text-blue-500'>Stripe ID:</span>
                    <span>{order?.stripeId}</span>
                </div>}
                <div className='flex gap-4'>
                    <span className='font-semibold text-blue-800 uppercase dark:text-blue-500'>Total Amount:</span>
                    <span>{order?.amount} CHF</span>
                </div>
                <h4 className='font-bold text-gray-500 text-xl'>Address Details</h4>
                <div className='flex gap-4'>
                    <span className='font-semibold text-blue-800 uppercase dark:text-blue-500'>City:</span>
                    <span>{order?.address?.city}</span>
                </div>
                <div className='flex gap-4'>
                    <span className='font-semibold text-blue-800 uppercase dark:text-blue-500'>Country:</span>
                    <span>{order?.address?.country}</span>
                </div>
                <div className='flex gap-4'>
                    <span className='font-semibold text-blue-800 uppercase dark:text-blue-500'>Street:</span>
                    <span>{order?.address?.line1}</span>
                </div>
                <div className='flex gap-4'>
                    <span className='font-semibold text-blue-800 uppercase dark:text-blue-500'>Postal Code:</span>
                    <span>{order?.address?.postal_code}</span>
                </div>
            </div>
            <UserInfo user={user} />
        </div>
        <h2 className='max-w-xl text-gray-600 font-bold text-4xl whitespace-pre-line'>Products ordered:</h2>
        <div className='flex px-8 pt-4 pb-12 gap-8 overflow-x-auto max-w-[1450px]'>
            {order?.products?.map(prod => {
                const foundProduct = products.find(dbProduct => dbProduct._id === prod.productId)
                return (
                    <ProductInfo key={prod.productId} product={foundProduct} hideDesc hideInStock quantity={prod.quantity} size={prod.size} color={prod.color} />
                )
            })}
        </div>
    </div>
  )
}
