import React from 'react'
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useDarkTheme from '../hooks/useDarkTheme'

export default function ActivityChart({data, dataKey, title}) {
  const [theme, setTheme] = useDarkTheme()

  return (
    <div className='flex flex-col gap-4 p-8 shadow-2xl rounded-lg cursor-pointer flex-grow max-w-[50%] min-h-[400px]'>
        <h1 className='text-gray-500 text-2xl font-semibold uppercase'>{title} Analytics</h1>
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <AreaChart width={400} height={400} data={data}>
                <defs>
                  <linearGradient id="data" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="50%" stopColor={theme === 'light' ? "#002699": "#3482F6"} stopOpacity={1}/>
                    <stop offset="99%" stopColor={theme === 'light' ? "#002699": "#3482F6"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Area type="monotone" dataKey={dataKey} stroke={theme === 'light' ? "#002699": "#3482F6"} fill='url(#data)' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
