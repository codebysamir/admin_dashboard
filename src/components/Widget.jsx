import React, { useEffect, useState } from 'react'
import { AccountBalanceOutlined, ArrowDownward, ArrowUpward, PaidOutlined, PersonOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import useWidgetData from '../hooks/useWidgetData'

export default function Widget({ type }) {
    const [ data, setData ] = useWidgetData(type)
    

  return (
    <div className='flex gap-16 justify-between p-8 shadow-2xl min-w-[300px] max-w-[320px] rounded-md hover:bg-slate-100'>
        <div className='flex flex-col gap-8 justify-between max-w-[110px]'>
            <span className='text-gray-500 text-2xl font-semibold'>{data?.title}</span>
            <div className='flex gap-4 whitespace-pre-line'>
                <span className='text-3xl font-semibold'>{data?.amount()}</span>
            </div>
            <Link to={data?.linkurl}>
                <span className="underline">{data?.linkname}</span>
            </Link>
        </div>
        <div className="flex flex-col justify-between items-end">
            <div className="flex flex-col items-end">
                <div>
                    <ArrowDownward className='text-red-700' />
                    <span>{data?.diffAmount()} %</span>
                </div>
                <span className='text-gray-500 font-semibold text-sm'>to last month</span>
            </div>
            {data?.icon}
        </div>
    </div>
  )
}
