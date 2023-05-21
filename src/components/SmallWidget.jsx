import { Visibility } from '@mui/icons-material'
import React from 'react'

export default function SmallWidget() {
  return (
    <div className='flex flex-col gap-2 p-8 shadow-2xl flex-1'>
        <h2 className='text-2xl font-semibold'>New Join Members</h2>
        <ul className='flex flex-col'>
            <li className='flex items-center'>
                <img src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                <div className='flex flex-col p-4'>
                    <span className='font-bold'>Anna Keller</span>
                    <span>Sofware Engineer</span>
                </div>
                <button className='flex gap-2 bg-slate-300 rounded-2xl py-2 px-4 h-10 hover:bg-slate-400'>
                    <Visibility />
                    Display
                </button>
            </li>
            <li className='flex items-center'>
                <img src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                <div className='flex flex-col p-4'>
                    <span className='font-bold'>Anna Keller</span>
                    <span>Sofware Engineer</span>
                </div>
                <button className='flex gap-2 bg-slate-300 rounded-2xl py-2 px-4 h-10 hover:bg-slate-400'>
                    <Visibility />
                    Display
                </button>
            </li>
            <li className='flex items-center'>
                <img src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                <div className='flex flex-col p-4'>
                    <span className='font-bold'>Anna Keller</span>
                    <span>Sofware Engineer</span>
                </div>
                <button className='flex gap-2 bg-slate-300 rounded-2xl py-2 px-4 h-10 hover:bg-slate-400'>
                    <Visibility />
                    Display
                </button>
            </li>
            <li className='flex items-center'>
                <img src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                <div className='flex flex-col p-4'>
                    <span className='font-bold'>Anna Keller</span>
                    <span>Sofware Engineer</span>
                </div>
                <button className='flex gap-2 bg-slate-300 rounded-2xl py-2 px-4 h-10 hover:bg-slate-400'>
                    <Visibility />
                    Display
                </button>
            </li>
            <li className='flex items-center'>
                <img src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                <div className='flex flex-col p-4'>
                    <span className='font-bold'>Anna Keller</span>
                    <span>Sofware Engineer</span>
                </div>
                <button className='flex gap-2 bg-slate-300 rounded-2xl py-2 px-4 h-10 hover:bg-slate-400'>
                    <Visibility />
                    Display
                </button>
            </li>
        </ul>
    </div>          
  )
}
