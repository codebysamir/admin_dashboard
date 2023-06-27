import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { OrderContext } from './OrderContext'
import { transformMonth } from '../utils/dateTransformer'

export default function useProductSales() {
  const [productStats, setProductStats] = useState([])
  const { stats } = useContext(OrderContext)

  console.log(stats)

  useEffect(() => {
    if (stats.length) setProductStats(stats.map(month => {
      console.log('set stats request')
      return {
        name: transformMonth(month._id),
        "Sales": month.total
      }
    }))
  

    return () => {
      setProductStats()
    }
  }, [stats])
  
  return [productStats, setProductStats]
}
