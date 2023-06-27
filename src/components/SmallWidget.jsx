import { Visibility } from '@mui/icons-material'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../hooks/UserContext'
import { Link } from 'react-router-dom'

export default function SmallWidget() {
    const { getAllUsersRequest, newestUsers, users } = useContext(UserContext)

    console.log(newestUsers)
    useEffect(() => {
        const controller = new AbortController()
        getAllUsersRequest(controller, 'newest=true')
        return () => controller.abort()
    }, [users])
    
  return (
    <div className='flex flex-col gap-8 p-8 shadow-2xl rounded-lg flex-1'>
        <h2 className='text-2xl font-semibold uppercase text-gray-500'>Newest Users</h2>
        <ul className='flex flex-col gap-2'>
            {newestUsers && 
            newestUsers.map(user => 
                <li key={user?._id} className='flex items-center justify-around'>
                    <img src={user?.img} alt="" className='w-16 h-16 object-cover rounded-full' />
                    <div className='flex flex-col p-4'>
                        <span className='font-bold'>{user?.username}</span>
                        <span>{user?.email}</span>
                    </div>
                    <Link to={'/user/' + user?._id}>
                        <button className='flex gap-2 bg-blue-800 text-slate-50 rounded-2xl py-2 px-4 h-10 hover:bg-blue-500'>
                            <Visibility />
                            View
                        </button>
                    </Link>
                </li>
            )
            }
        </ul>
    </div>          
  )
}
