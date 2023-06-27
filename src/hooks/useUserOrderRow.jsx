import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { OrderContext } from './OrderContext'
import { dateTransformer } from '../utils/dateTransformer'

export default function useUserOrderRow() {
  const [row, setRow] = useState([])
  const { order } = useContext(OrderContext)

  console.log(order)

  useEffect(() => {
    if (order) setRow(order?.map(order => {
        return {
            id: order._id,
            products: order.products,
            date: dateTransformer(order.createdAt),
            amount: order.amount,
            status: order.status
        }
    }))
  

    return () => {
      setRow()
    }
  }, [order])

  return [row, setRow]
}
