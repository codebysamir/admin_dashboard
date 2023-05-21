import { AdminPanelSettings, FileUpload, MailOutline, PersonOutline } from '@mui/icons-material'
import React, { useState } from 'react'
import UserInfo from '../components/UserInfo'

export default function EditUser() {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isAdmin, setIsAdmin] = useState()

  return (
    <div className='flex flex-col gap-4 p-12'>
        <h1 className='font-extrabold text-3xl mb-4'>Edit User</h1>
        <div className='flex flex-wrap gap-8'>
            <UserInfo />
            <form className='p-8 flex flex-col gap-8 shadow-xl min-w-fit flex-grow' action="" method="post" onSubmit={() => console.log('test form')}>
                <span>Choose which field to edit and save it.</span>
                <div className='flex flex-wrap gap-28 p-4'>
                    <div className='flex flex-col gap-4'>
                        <input className='border-4 rounded-lg p-2' type="text" id="username" placeholder='Enter new username' />
                        <input className='border-4 rounded-lg p-2' type="text" id="email" placeholder='Enter new email' />
                        <input className='border-4 rounded-lg p-2' type="text" id="password" placeholder='Enter new password' />
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="isAdmin">Is Admin: </label>
                            <input className='border-4 rounded-lg p-2' name='isAdmin' type="checkbox" id="isAdmin" />
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <img className='w-36 h-36 object-cover rounded-3xl' src='https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" />
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
