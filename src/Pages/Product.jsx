import { AttachMoney, CategoryOutlined, EditOutlined, FileUpload, Inventory2Outlined, InventoryOutlined, PageviewOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import ActivityChart from '../components/ActivityChart'
import { DataGrid } from '@mui/x-data-grid'
import { Link, useLocation } from 'react-router-dom'
import ProductInfo from '../components/ProductInfo'
import { ProductContext } from '../hooks/ProductContext'
import { MoonLoader } from 'react-spinners'
import useProductOrderRow from '../hooks/useProductOrderRow'
import { OrderContext } from '../hooks/OrderContext'
import useProductSales from '../hooks/useProductSales'


export default function Product() {
    const location = useLocation()
    const productId = location.pathname.split('/').at(-1)
    const [stats, setStats] = useProductSales()
    const { getProductRequest, product, loading, error } = useContext(ProductContext)
    const { getProductOrderIncomeStatsRequest, getAllOrdersRequest } = useContext(OrderContext)
    const [row, setRow] = useProductOrderRow(productId, product?.price)

    console.log(row)

    useEffect(() => {
        console.log(productId)
        // setProduct(products.find(product => product._id === productId))
        const controller = new AbortController()
        getProductRequest(controller, productId)
        getProductOrderIncomeStatsRequest(controller, productId)
        getAllOrdersRequest(controller)

        return () => controller.abort()
    }, [])

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 300 },
        { field: 'customer', headerName: 'Customer', width: 300, renderCell: params => {
            return(
                <div className='flex gap-4 items-center'>
                    <img className='w-10 h-10 object-cover rounded-full' src={params.row.customer?.img} alt="" />
                    <span className='font-bold'>{params.row.customer?.username}</span>
                </div>
            )
        } },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
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
                <div className='flex-grow flex place-content-center place-items-center'>
                    <MoonLoader color='#2038bb' />
                </div>
                :
                <ProductInfo product={product} />
            }
            {stats &&
            <ActivityChart data={stats} dataKey={'Sales'} title={'Sales Performance'} />}
        </div>
        <div className='flex flex-col gap-8 p-8 shadow-2xl'>
            <h3 className='text-gray-500 font-semibold text-2xl'>Last Transactions</h3>
            {row && <DataGrid
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
