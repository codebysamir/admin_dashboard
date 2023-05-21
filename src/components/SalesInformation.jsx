import { ArrowDownward, ArrowUpward, PaidOutlined } from '@mui/icons-material'
import React, { useState } from 'react'

export default function SalesInformation() {

  return (
    <div className='flex p-8 justify-evenly'>
        <div className='flex flex-col gap-4 p-12 shadow-xl cursor-pointer hover:bg-slate-100'>
            <span className='text-2xl font-semibold'>Revenue</span>
            <div className='flex gap-4'>
                <span className='text-3xl font-bold'>2543 CHF</span>
                <span>-11.4 %</span>
                <ArrowDownward className='text-red-700' />
            </div>
            <span className='text-gray-500 font-semibold'>Compared to last month</span>
        </div>
        <div className='flex flex-col gap-4 p-12 shadow-xl cursor-pointer hover:bg-slate-100'>
            <span className='text-2xl font-semibold'>Sales</span>
            <div className='flex gap-4'>
                <span className='text-3xl font-bold'>2543 CHF</span>
                <span>-11.4 %</span>
                <ArrowDownward className='text-red-700' />
            </div>
            <span className='text-gray-500 font-semibold'>Compared to last month</span>
        </div>
        <div className='flex flex-col gap-4 p-12 shadow-xl cursor-pointer hover:bg-slate-100'>
            <span className='text-2xl font-semibold'>Cost</span>
            <div className='flex gap-4'>
                <span className='text-3xl font-bold'>2543 CHF</span>
                <span>+2.4 %</span>
                <ArrowUpward className='text-green-700' />
            </div>
            <span className='text-gray-500 font-semibold'>Compared to last month</span>
        </div>
    </div>
  )
}
