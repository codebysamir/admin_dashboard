import React, { useContext, useEffect, useState } from 'react'
import UserInfo from '../components/UserInfo'
import ActivityChart from '../components/ActivityChart'
import { DataGrid } from '@mui/x-data-grid'
import { UserContext } from '../hooks/UserContext'
import { OrderContext } from '../hooks/OrderContext'
import { Link, useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import useUserSpendings from '../hooks/useUserSpendings'
import useUserOrderRow from '../hooks/useUserOrderRow'
import { ProductContext } from '../hooks/ProductContext'
import { PageviewOutlined } from '@mui/icons-material'

export default function User() {
    const { id: userId } = useParams()
    const [stats, setStats] = useUserSpendings()
    const [row, setRow] = useUserOrderRow()
    const { products } = useContext(ProductContext)
    const { getUserRequest, user, loading, error } = useContext(UserContext)
    const { getUserOrderIncomeStatsRequest, getOrderRequest, order, loading: orderLoading, error: orderError } = useContext(OrderContext)

    console.log(row)

    useEffect(() => {
        // setProduct(products.find(product => product._id === productId))
        const controller = new AbortController()
        getUserRequest(controller, userId)
        getOrderRequest(controller, userId)
        getUserOrderIncomeStatsRequest(controller, userId)

        return () => controller.abort()
    }, [])

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 300 },
        { field: 'products', headerName: 'Products', width: 400, renderCell: params => {
            return(
                <div className='flex gap-4 items-center'>
                    {params.row.products.map(product => {
                        const dbProduct = products.find(prod => prod._id === product.productId)
                        return (
                            <div key={product.productId} className='relative'>
                                <img key={dbProduct?._id} className='w-10 h-10 object-cover rounded-full' src={dbProduct?.img} alt="" />
                                {product.quantity > 1 && <span className='absolute bottom-0 text-white bg-black w-5 h-5 rounded-full text-center border-2'>{product.quantity}</span>}
                            </div>
                            )
                        })
                    }
                </div>
            )
        } },
        { field: 'date', headerName: 'Date', width: 300 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
            return(
                <>
                    <Link to={'/order/' + params.row.id} state={{userId: params.row.userId}}>
                        <PageviewOutlined titleAccess='View' className='text-blue-800 hover:text-blue-500 cursor-pointer' />
                    </Link>
                </>
            )
        } }
    ];

  return (
    <div className='flex flex-col gap-12 p-8 bg-slate-50 dark:bg-slate-800 dark:text-slate-300'>
        <div className='flex gap-8'>
            {loading ?
            <div className='shadow-2xl w-[600px] flex flex-col flex-grow p-8 gap-8'>
                <Skeleton variant='text' sx={{ fontSize: '2rem'}} width={200}/>
                <div className='flex gap-4'>
                    <Skeleton variant='circular' width={200} height={200}/>
                    <Skeleton variant='rounded' width={400} height={200}/>
                </div>
            </div>
            :
            <UserInfo user={user} />
            }
            {stats ?
            <ActivityChart data={stats} dataKey={'Sales'} title={'User Spendings'} />
            : <span>...LOADING</span>
            }
        </div>
        <div className='flex flex-col gap-8 p-8 shadow-2xl'>
            <h3 className='text-gray-500 font-semibold text-2xl'>Last Transactions</h3>
            {row &&
            <DataGrid
                rows={row}
                columns={columns}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                className='dark:text-slate-300'
            />}
        </div>
    </div>
  )
}
