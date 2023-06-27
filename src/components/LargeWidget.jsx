import React, { useContext, useEffect } from 'react'
import { OrderContext } from '../hooks/OrderContext'
import { UserContext } from '../hooks/UserContext'
import { ProductContext } from '../hooks/ProductContext'
import { dateTransformer } from '../utils/dateTransformer'
import { Link } from 'react-router-dom'
import { PageviewOutlined } from '@mui/icons-material'

export default function LargeWidget() {
    const {getAllOrdersRequest, orders, newestOrders} = useContext(OrderContext)
    const {users} = useContext(UserContext)
    const {products} = useContext(ProductContext)

    console.log(newestOrders)
    useEffect(() => {
        const controller = new AbortController()
        getAllOrdersRequest(controller, 'newest=true')
        return () => controller.abort()
    }, [orders])

  return (
    <div className='flex flex-col gap-2 p-8 shadow-2xl rounded-lg flex-grow'>
        <h2 className='text-gray-500 text-2xl font-semibold uppercase'>Latest Transactions</h2>
        <table className='text-left w-full border-spacing-4 border-separate'>
            <colgroup span="5"></colgroup>
            <thead>
                <tr className='h-12'>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {(newestOrders && users) &&
                    newestOrders.map(order => {
                        const user = users ? users.find(user => user._id === order.userId) : null
                        return (
                        <tr key={order?._id}>
                            <td className='flex items-center gap-4'>
                                <img src={user?.img} alt="" className='w-16 h-16 object-cover rounded-full' />
                                <span className='font-bold'>{user?.username}</span>
                            </td>
                            <td>
                                <div className='flex max-w-[400px] overflow-x-auto overflow-y-hidden'>
                                    {order?.products.map(product => {
                                        const orderProduct = products.find(prod => prod._id === product.productId)
                                        return (
                                        <div key={product?.productId + product.size + product.color} className='relative'>
                                            <img src={orderProduct?.img} alt="" className='w-14 h-14  object-cover rounded-full' />
                                            {product.quantity > 1 && <span className='absolute bottom-0 text-white bg-black w-5 h-5 rounded-full text-center border-2'>{product.quantity}</span>}
                                        </div>
                                        )
                                    })}
                                </div>
                            </td>
                            <td>{dateTransformer(order?.createdAt)}</td>
                            <td>{order?.amount} CHF</td>
                            <td>
                                <span className='rounded-lg bg-slate-500 p-2 text-white'>
                                    {order?.status}
                                </span>
                            </td>
                            <td>
                                <Link to={'/order/' + order._id}>
                                    <PageviewOutlined titleAccess='View' fontSize='large' className='text-blue-800 hover:text-blue-500 cursor-pointer' />
                                </Link>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
