import React from 'react'

export default function LargeWidget() {
  return (
    <div className='flex flex-col gap-2 p-8 shadow-2xl flex-grow'>
        <h2 className='text-2xl font-semibold'>Latest Transactions</h2>
        <table className='text-left w-full border-spacing-4 border-separate'>
            <colgroup span="4"></colgroup>
            <thead>
                <tr className='h-12'>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='flex items-center gap-4'>
                        <img src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                        <span className='font-bold'>Peter Meier</span>
                    </td>
                    <td>2 Jun 2021</td>
                    <td>122.00 CHF</td>
                    <td>
                        <span className='rounded-lg bg-slate-400 p-2'>
                            Approved
                        </span>
                    </td>
                </tr>
                <tr>
                    <td className='flex items-center gap-4'>
                        <img src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                        <span className='font-bold'>Peter Meier</span>
                    </td>
                    <td>2 Jun 2021</td>
                    <td>122.00 CHF</td>
                    <td>
                        <span className='rounded-lg bg-slate-400 p-2'>
                            Approved
                        </span>
                    </td>
                </tr>
                <tr>
                    <td className='flex items-center gap-4'>
                        <img src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                        <span className='font-bold'>Peter Meier</span>
                    </td>
                    <td>2 Jun 2021</td>
                    <td>122.00 CHF</td>
                    <td>
                        <span className='rounded-lg bg-slate-400 p-2'>
                            Approved
                        </span>
                    </td>
                </tr>
                <tr>
                    <td className='flex items-center gap-4'>
                        <img src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='w-16 rounded-full' />
                        <span className='font-bold'>Peter Meier</span>
                    </td>
                    <td>2 Jun 2021</td>
                    <td>122.00 CHF</td>
                    <td>
                        <span className='rounded-lg bg-slate-400 p-2'>
                            Approved
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
