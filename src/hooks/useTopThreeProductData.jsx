import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from './ProductContext'

export default function useTopThreeProductData() {
  const [data, setData] = useState([])
  const { getMonthlySoldProductRequest, productsSales } = useContext(ProductContext)

  useEffect(() => {
    const controller = new AbortController()

    getMonthlySoldProductRequest(controller)

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (productsSales.length) {
      const newSalesArr = productsSales.map(product => {
        let totalSoldLastYear = 0
        product.soldPerMonth.forEach(month => totalSoldLastYear += month.total)
        return {
          id: product.id,
          totalSoldLastYear
        }
      }).toSorted((a, b) => b.totalSoldLastYear - a.totalSoldLastYear).slice(0, 3)
      console.log(newSalesArr)
      setData(newSalesArr)
    }
  }, [productsSales])
  
  return [data, setData]
}
