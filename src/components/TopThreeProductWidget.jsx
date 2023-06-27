import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import React, { useContext } from 'react'
import useTopThreeProductData from '../hooks/useTopThreeProductData'
import { ProductContext } from '../hooks/ProductContext'
import { Link } from 'react-router-dom'

export default function TopThreeProductWidget() {
    const [sales, setSales] = useTopThreeProductData()
    const { products } = useContext(ProductContext)

    console.log(sales)

  return (
    <div className='flex flex-col gap-12 p-8 shadow-2xl rounded-lg flex-grow'>
        <h2 className='text-center text-gray-500 font-semibold text-2xl uppercase'>Top 3 product</h2>
        <div className='flex flex-col gap-8'>
            {sales &&
                sales.map(product => {
                    const dbProduct = products.find(prod => prod._id === product.id)
                    return (
                        <div key={product.id} className='flex justify-between items-center'>
                            <div className='flex gap-4'>
                                <img className='w-16 h-16 object-cover rounded-full' src={dbProduct.img} alt="" />
                                <div className='flex flex-col gap-2 overflow-hidden max-h-[100%]'>
                                    <span className='font-bold'>{dbProduct.title}</span>
                                    <span>{dbProduct.category.join(', ')}</span>
                                </div>
                            </div>
                            <div className='flex gap-10'>
                                <div className='flex flex-col gap-2 font-semibold'>
                                    <span className='font-bold'>Total this month</span>
                                    <span className='text-xl'>{product.totalSoldLastYear} CHF</span>
                                </div>
                                <Link to={'/product/' + product.id}>
                                    <button className='bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-500'>View</button>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
