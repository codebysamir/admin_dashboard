import { AttachMoney, CategoryOutlined, FileUpload, Inventory2Outlined, InventoryOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import ActivityChart from '../components/ActivityChart'
import { productData } from '../UserData'
import ProductInfo from '../components/productInfo'

export default function EditUser() {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isAdmin, setIsAdmin] = useState()

  return (
    <div className='flex flex-col gap-4 p-12'>
        <h1 className='font-extrabold text-3xl mb-4'>Edit Product</h1>
        <div className='flex flex-wrap gap-8'>
            <ProductInfo />
            <form className='p-8 flex flex-col gap-8 shadow-2xl min-w-fit flex-grow' action="" method="post" onSubmit={() => console.log('test form')}>
                <div>
                    <h2 className='font-extrabold text-3xl mb-4'>Edit Product</h2>
                    <span>Choose which field to edit and save it.</span>
                </div>
                <div className='flex flex-wrap gap-28 p-4'>
                    <div className='flex flex-col gap-4'>
                        <input className='border-4 rounded-lg p-2' type="text" id="productname" placeholder='Enter new productname' />
                        <input className='border-4 rounded-lg p-2' type="text" id="price" placeholder='Enter new price' />
                        <input className='border-4 rounded-lg p-2' type="text" id="categories" placeholder='Enter new categories' />
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="inStock">In Stock: </label>
                            <input className='border-4 rounded-lg p-2' name='inStock' type="checkbox" id="inStock" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 items-center'>
                        <img className='w-40 h-40 object-cover rounded-3xl' src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        <div className="flex gap-2">
                            <label htmlFor="imgUpload" className='cursor-pointer'>
                                <FileUpload fontSize='large' className='text-blue-900 hover:text-blue-600' />
                            </label>
                            <input type="file" name="" id="imgUpload" className='hidden' />
                        </div>
                    </div>
                </div>
                <button className='border-transparent border-2 bg-blue-950 text-white hover:bg-blue-600 p-2 rounded-md w-56 font-semibold transition-all'>SAVE</button>
            </form>
        </div>
    </div>
  )
}
