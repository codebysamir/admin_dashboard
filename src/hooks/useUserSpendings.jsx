import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { OrderContext } from './OrderContext'

export default function useUserSpendings() {
  const [value, setValue] = useState([])
  const { stats } = useContext(OrderContext)

  console.log(stats)

  useEffect(() => {
    setValue(stats.map(month => {
      console.log('set stats request')
      return {
        name: transformMonth(month._id),
        "Sales": month.total
      }
    }))
  

    return () => {
      setValue()
    }
  }, [stats.length])

  function transformMonth(month) {
    switch (month) {
      case 1:
        return 'Jan'
        break;
      case 2:
        return 'Feb'
        break;
      case 3:
        return 'Mar'
        break;
      case 4:
        return 'Apr'
        break;
      case 5:
        return 'May'
        break;
      case 6:
        return 'Jun'
        break;
      case 7:
        return 'Jul'
        break;
      case 8:
        return 'Aug'
        break;
      case 9:
        return 'Sep'
        break;
      case 10:
        return 'Okt'
        break;
      case 11:
        return 'Nov'
        break;
      case 12:
        return 'Dez'
        break;
    
      default:
        break;
    }
  }
  
  return [value, setValue]
}
