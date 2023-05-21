import React from 'react'
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function ActivityChart({data, dataKey, title}) {

  return (
    <div className='flex flex-col gap-4 p-8 shadow-2xl cursor-pointer flex-grow'>
        <h1 className='text-gray-500 text-2xl font-semibold'>{title} Analytics</h1>
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <AreaChart width={400} height={400} data={data}>
                <defs>
                  <linearGradient id="data" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="50%" stopColor="#002699" stopOpacity={1}/>
                    <stop offset="99%" stopColor="#002699" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Area type="monotone" dataKey={dataKey} stroke="#002699" fill='url(#data)' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
