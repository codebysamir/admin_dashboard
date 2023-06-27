import { AttachMoney, CategoryOutlined, EditOutlined, DescriptionOutlined, InventoryOutlined, StraightenOutlined, PaletteOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../hooks/ProductContext'

export default function ProductInfo({product, hideDesc, hideInStock, quantity, size, color}) {
    const location = useLocation()
    const { products, loading, error } = useContext(ProductContext)
    // const [product, setProduct] = useState()

    
    // console.log(products)
    console.log(location.pathname)
    
    

  return (
    <div className='flex flex-col gap-8 p-8 min-w-[500px] max-w-[45%] h-fit shadow-2xl rounded-lg flex-grow relative'>
        <div className='flex justify-between'>
            <h2 className='max-w-xl text-gray-600 font-bold text-4xl whitespace-pre-line'>{product?.title}</h2>
            {(!location.pathname.includes('edit') && location.pathname.includes('product')) &&
            <Link to={'/edit-product/' + product?._id} state={product}>
                <EditOutlined titleAccess='Edit' className='cursor-pointer text-blue-800 dark:text-blue-500' />
            </Link>
            }
        </div>
        <div className='flex gap-8 flex-wrap flex-grow'>
            <div className='flex flex-shrink-0 max-h-96'>
                <img className='min-w-[160px] max-w-[250px] object-cover rounded-2xl' src={product?.img} alt="" />
            </div>
            <div className='flex flex-col gap-4'>
                <h4 className='font-bold text-gray-500 text-xl'>Product Details</h4>
                {!hideDesc &&
                <div className='flex gap-2 max-w-xs max-h-36 overflow-y-auto flex-grow'>
                    <DescriptionOutlined className='text-blue-800 dark:text-blue-500' />
                    <p>{product?.desc}</p>
                </div>}
                <div className='flex gap-2'>
                    <AttachMoney className='text-blue-800 dark:text-blue-500' />
                    <span>{product?.price} CHF</span>
                </div>
                <div className='flex gap-2'>
                    <CategoryOutlined className='text-blue-800 dark:text-blue-500' />
                    {product?.category.map((cat, index) => <span key={index}>{cat}</span>)}
                </div>
                <div className='flex gap-2'>
                    <StraightenOutlined className='text-blue-800 dark:text-blue-500' />
                    {!size ? 
                    product?.size.map((size, index) => <span key={index}>{size}</span>)
                    : <span>{size}</span>}
                </div>
                <div className='flex gap-2'>
                    <PaletteOutlined className='text-blue-800 dark:text-blue-500' />
                    {!color ?
                    product && Object.entries(product?.color).map(([colorName, colorHex]) => 
                            <span title={colorName} key={colorName} style={{color: colorHex, backgroundColor: colorHex}} className={`border border-black rounded-full w-6 h-6`} ></span>)
                    : <span title={Object.keys(color)[0]} style={{color: Object.values(color)[0], backgroundColor: Object.values(color)[0]}} className={`border border-black rounded-full w-6 h-6`} ></span>}
                </div>
                {!hideInStock &&
                <div className='flex gap-2'>
                    <InventoryOutlined className='text-blue-800 dark:text-blue-500' />
                    <span>{product?.inStock ? 'In stock' : 'Not in stock'}</span>
                </div>}
            </div>
        </div>
        {(quantity && quantity > 1) &&
        <div className='border-2 border-white bg-black rounded-full w-10 h-10 absolute top-[-2%] left-[-2%]'>
            <span className='font-semibold text-xl text-white absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>{quantity}</span>
        </div>}
    </div>
  )
}
