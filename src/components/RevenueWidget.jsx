import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import React, { useContext } from 'react'

export default function RevenueWidget() {

  return (
    <div className='flex flex-wrap gap-12 p-8 shadow-2xl rounded-lg flex-grow'>
        <div className='flex flex-col gap-12 flex-grow'>
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
    </div>
  )
}
