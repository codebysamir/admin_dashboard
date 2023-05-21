import React from 'react'
import SalesInformation from '../components/SalesInformation'
import ActivityChart from '../components/ActivityChart'
import { userData } from '../UserData'
import SmallWidget from '../components/SmallWidget'
import LargeWidget from '../components/LargeWidget'
import Widget from '../components/Widget'
import RevenueWidget from '../components/RevenueWidget'

export default function Home() {
  return (
    <div className='flex flex-col gap-12 px-20 py-8 bg-slate-50'>
        <div className='flex justify-between w-[1500px] overflow-x'>
          <Widget type={'EARNINGS'} />
          <Widget type={'USERS'} />
          <Widget type={'ORDERS'} />
          <Widget type={'BALANCE'} />
        </div>
        <div className='flex gap-8'>
          <RevenueWidget />
          <ActivityChart data={userData} dataKey={'Active User'} title={'User'} />
        </div>
        <div className='flex gap-8'>
            <SmallWidget />
            <LargeWidget />
        </div>
    </div>
  )
}
