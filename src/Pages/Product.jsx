import { AttachMoney, CategoryOutlined, EditOutlined, FileUpload, Inventory2Outlined, InventoryOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import ActivityChart from '../components/ActivityChart'
import { productData, productOrdersRow } from '../UserData'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import ProductInfo from '../components/productInfo'

export default function Product() {
    const [row, setRow] = useState(productOrdersRow)

    const columns = [
        { field: 'orderId', headerName: 'Order ID', width: 300 },
        { field: 'username', headerName: 'Customer', width: 300, renderCell: params => {
            return(
                <div className='flex gap-4 items-center'>
                    <img className='w-10 h-10 object-cover rounded-full' src={params.row.img} alt="" />
                    <span className='font-bold'>{params.row.username}</span>
                </div>
            )
        } },
        { field: 'date', headerName: 'Date', width: 300 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
    ];

  return (
    <div className='flex flex-col gap-12 p-8'>
        <div className='flex gap-8'>
            <ProductInfo />
            <ActivityChart data={productData} dataKey={'Sales'} title={'Sales Performance'} />
        </div>
        <div className='flex flex-col gap-8 p-8 shadow-2xl'>
            <h3 className='text-gray-500 font-semibold text-2xl'>Last Transactions</h3>
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
            />
        </div>
    </div>
  )
}
