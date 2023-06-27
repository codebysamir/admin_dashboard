import React, { useContext, useEffect, useState } from 'react'
import { AccountBalanceOutlined, ArrowDownward, ArrowUpward, PaidOutlined, PersonOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { UserContext } from './UserContext'
import { OrderContext } from './OrderContext'

export default function useWidgetData(type) {
    const [value, setValue] = useState()
    const { users, loading } = useContext(UserContext)
    const { getMonthlyIncomeRequest, orders, income } = useContext(OrderContext)

    useEffect(() => {
        const controller = new AbortController()
        getMonthlyIncomeRequest(controller)

        return () => controller.abort()
    }, [])

    useEffect(() => {
        switch (type.toUpperCase()) {
            case 'EARNINGS':
                setValue({
                    title: 'EARNINGS',
                    isMoney: true,
                    amount: () => {
                        console.log(income)
                        const earnings = income.length ? income[0].total : null
                        const amount = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(earnings)
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
                        const amount = orders.length
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
                        // getAllUsersRequest()
                        const amount = loading ? '...loading' : users.length
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
                        let balance = 0
                        if (income.length) income.forEach(month => balance += month.total)
                        const amount = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(balance)
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
    }, [users, orders, loading, income])

  return [value, setValue]
}
