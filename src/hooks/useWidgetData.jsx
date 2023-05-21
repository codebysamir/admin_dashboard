import React, { useEffect, useState } from 'react'
import { AccountBalanceOutlined, ArrowDownward, ArrowUpward, PaidOutlined, PersonOutlined, ShoppingBagOutlined } from '@mui/icons-material'

export default function useWidgetData(type) {
    const [value, setValue] = useState()

    useEffect(() => {
        switch (type.toUpperCase()) {
            case 'EARNINGS':
                setValue({
                    title: 'EARNINGS',
                    isMoney: true,
                    amount: () => {
                        // getAllOrders Fetch .total
                        const amount = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(4000)
                        return amount
                    },
                    diffAmount: () => {
                        // compare to last [diff] (z.b. last month)
                        const amount = 20
                        return amount
                    },
                    linkname: 'See net earnings',
                    linkurl: '/earnings',
                    icon: (<PaidOutlined className='p-1 bg-green-400 text-green-700 rounded-md' />)
                })
                break;

            case 'ORDERS':
                setValue({
                    title: 'ORDERS',
                    isMoney: false,
                    amount: () => {
                        // getAllOrders Fetch .total
                        const amount = 500
                        return amount
                    },
                    diffAmount: () => {
                        // compare to last [diff] (z.b. last month)
                        const amount = 12
                        return amount
                    },
                    linkname: 'View all orders',
                    linkurl: '/orders',
                    icon: (<ShoppingBagOutlined className='p-1 bg-yellow-400 text-yellow-700 rounded-md' />)
                })
                break;

            case 'USERS':
                setValue({
                    title: 'USERS',
                    isMoney: false,
                    amount: () => {
                        // getAllOrders Fetch .total
                        const amount = 150
                        return amount
                    },
                    diffAmount: () => {
                        // compare to last [diff] (z.b. last month)
                        const amount = 30
                        return amount
                    },
                    linkname: 'View all users',
                    linkurl: '/users',
                    icon: (<PersonOutlined className='p-1 bg-blue-400 text-blue-700 rounded-md' />)
                })
                break;
        
            case 'BALANCE':
                setValue({
                    title: 'BALANCE',
                    isMoney: true,
                    amount: () => {
                        // getAllOrders Fetch .total
                        const amount = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(12500)
                        return amount
                    },
                    diffAmount: () => {
                        // compare to last [diff] (z.b. last month)
                        const amount = 5
                        return amount
                    },
                    linkname: 'See details',
                    linkurl: '/balance',
                    icon: (<AccountBalanceOutlined className='p-1 bg-violet-400 text-violet-700 rounded-md' />)
                })
                break;
        
            default:
                break;
        }
    }, [])

  return [value, setValue]
}
