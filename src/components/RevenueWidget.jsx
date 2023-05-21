import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import React from 'react'

export default function RevenueWidget() {
  return (
    <div className='flex flex-wrap gap-12 p-8 shadow-2xl flex-grow'>
        <div className='flex flex-col gap-12'>
            <h3 className='text-gray-500 text-2xl font-semibold'>Total Revenue</h3>
            <div className='flex flex-col gap-4 items-center'>
                <span className='text-gray-500 font-semibold'>Total sales made today</span>
                <span className='text-4xl font-bold'>420 CHF</span>
            </div>
            <div className='flex gap-4 justify-between'>
                <div className='flex flex-col'>
                    <span className='text-center text-gray-500 font-semibold'>3 Days Ago</span>
                    <div className='flex gap-4 text-green-700 font-semibold'>
                        <ArrowDropUp />
                        CHF 600
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-center text-gray-500 font-semibold'>2 Days Ago</span>
                    <div className='flex gap-4 text-red-700 font-semibold'>
                        <ArrowDropDown />
                        CHF 380
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-center text-gray-500 font-semibold'>Yesterday</span>
                    <div className='flex gap-4 text-green-700 font-semibold'>
                        <ArrowDropUp />
                        CHF 500
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-4 mt-8'>
            <span className='text-center text-gray-500 font-semibold'>Revenue by top 3 product</span>
            <div className='flex gap-4 justify-between items-center'>
                <div className='flex gap-4'>
                    <img className='w-14 h-14 object-cover rounded-full' src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>Camera</span>
                        <span>Sony</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-semibold'>
                    <span className='font-bold'>Total this month</span>
                    <span>100 CHF</span>
                </div>
                <button className='bg-blue-800 text-white px-4 py-2 rounded-xl'>View</button>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4'>
                    <img className='w-14 h-14 object-cover rounded-full' src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>Camera</span>
                        <span>Sony</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-semibold'>
                    <span className='font-bold'>Total this month</span>
                    <span>100 CHF</span>
                </div>
                <button className='bg-blue-800 text-white px-4 py-2 rounded-xl'>View</button>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4'>
                    <img className='w-14 h-14 object-cover rounded-full' src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <div className='flex flex-col gap-2'>
                        <span className='font-bold'>Camera</span>
                        <span>Sony</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 font-semibold'>
                    <span className='font-bold'>Total this month</span>
                    <span>100 CHF</span>
                </div>
                <button className='bg-blue-800 text-white px-4 py-2 rounded-xl'>View</button>
            </div>
        </div>
    </div>
  )
}
