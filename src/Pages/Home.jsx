import React from 'react'
import ActivityChart from '../components/ActivityChart'
import useUserData from '../hooks/useUserData'
import SmallWidget from '../components/SmallWidget'
import LargeWidget from '../components/LargeWidget'
import Widget from '../components/Widget'
import TopThreeProductWidget from '../components/TopThreeProductWidget'

export default function Home() {
  const [userStats, setUserStats] = useUserData()


  return (
    <div className='flex flex-col gap-12 px-20 py-8 bg-slate-50 dark:bg-slate-800 dark:text-slate-300'>
        <div className='flex justify-between w-[1500px] overflow-x'>
          <Widget type={'EARNINGS'} />
          <Widget type={'USERS'} />
          <Widget type={'ORDERS'} />
          <Widget type={'BALANCE'} />
        </div>
        <div className='flex gap-8'>
          <TopThreeProductWidget />
          {userStats &&
            <ActivityChart data={userStats} dataKey={'Active User'} title={'User'} />}
        </div>
        <div className='flex gap-8'>
            <SmallWidget />
            <LargeWidget />
        </div>
    </div>
  )
}
