import { AttachMoney, CategoryOutlined, EditOutlined, FileUpload, Inventory2Outlined, InventoryOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import ActivityChart from '../components/ActivityChart'
import { DataGrid } from '@mui/x-data-grid'
import { useLocation, useParams } from 'react-router-dom'
import OrderInfo from '../components/OrderInfo'
import { OrderContext } from '../hooks/OrderContext'
import { MoonLoader } from 'react-spinners'


export default function Order() {
    const [order, setOrder] = useState()
    const { id: orderId } = useParams()
    const { getAllOrdersRequest, getOrderRequest, order: dbOrder, orders, loading, error } = useContext(OrderContext)

    useEffect(() => {
        const controller = new AbortController()
        
        console.log(order)
        getAllOrdersRequest(controller)

        return () => {
            controller.abort()
        }
    }, [])

    useEffect(() => {
        if (orders) {
            console.log('orders available')
            setOrder(orders.find(order => order._id === orderId))
        }

        return () => {
            console.log(order)
            setOrder()
        }
    }, [orders])

  return (
    <div className='flex gap-8 p-8 flex-wrap bg-slate-50 dark:bg-slate-800 dark:text-slate-300'>
        {loading ? 
            <div className='flex-grow flex place-content-center place-items-center'>
                <MoonLoader color='#2038bb' />
            </div>
            :
            <OrderInfo order={order} />
        }
    </div>
  )
}
