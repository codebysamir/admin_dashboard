import React from 'react'
import userPreview from "../assets/user.png"
import { FileUpload } from '@mui/icons-material'

export default function CreateUser() {
  return (
    <div className='flex flex-col gap-4 p-12'>
        <h1 className='font-extrabold text-3xl mb-4'>Create User</h1>
        <div className='flex gap-8'>
            <form className='p-8 flex flex-col gap-8 shadow-xl w-fit' action="" method="post" onSubmit={() => console.log('test form')}>
                <span>All fields need to be filled out.</span>
                <div className='flex gap-28 p-4'>
                    <div className='flex flex-col gap-4'>
                        <input className='border-4 rounded-lg p-2' type="text" id="username" placeholder='Enter username' />
                        <input className='border-4 rounded-lg p-2' type="text" id="email" placeholder='Enter email' />
                        <input className='border-4 rounded-lg p-2' type="text" id="password" placeholder='Enter password' />
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="isAdmin">Is Admin: </label>
                            <input className='border-4 rounded-lg p-2' name='isAdmin' type="checkbox" id="isAdmin" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 items-center'>
                        <img className='w-36 h-36 object-cover rounded-3xl' src={userPreview} alt="" />
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
