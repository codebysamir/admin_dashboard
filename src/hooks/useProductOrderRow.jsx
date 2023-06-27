import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { OrderContext } from './OrderContext'
import { dateTransformer } from '../utils/dateTransformer'

export default function useProductOrderRow(productId, price) {
  const [row, setRow] = useState([])
  const { orders } = useContext(OrderContext)
  const { users } = useContext(UserContext)

  console.log(orders)
  console.log(row)

  useEffect(() => {
    if (orders && users) setRow(() => {
      
      const productIncluededArray = orders?.filter(order => {
        const productIncluded = order.products.find(product => product.productId === productId)
        console.log(productIncluded)
        if (productIncluded) return true
      })
      console.log(productIncluededArray)
      const newRow = productIncluededArray.map(order => {
        const user = users.find(user => user._id === order.userId)
        const product = order.products.find(product => product.productId === productId)
        console.log(price)
        return {
            id: order._id,
            customer: user,
            date: dateTransformer(order.createdAt),
            quantity: product?.quantity,
            amount: Number(price * product?.quantity),
            status: order.status
        }
      })
      console.log(newRow)
      return newRow.toReversed()
    })
  

    return () => {
      setRow()
    }
  }, [orders, users])

  return [row, setRow]
}
