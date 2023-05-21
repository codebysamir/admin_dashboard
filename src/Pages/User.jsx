import React, { useState } from 'react'
import { productData, userOrdersRow } from '../UserData'
import UserInfo from '../components/UserInfo'
import ActivityChart from '../components/ActivityChart'
import { DataGrid } from '@mui/x-data-grid'

export default function User() {
    const [row, setRow] = useState(userOrdersRow)

    const columns = [
        { field: 'orderId', headerName: 'Order ID', width: 300 },
        { field: 'productname', headerName: 'Product', width: 300, renderCell: params => {
            return(
                <div className='flex gap-4 items-center'>
                    <img className='w-10 h-10 object-cover rounded-full' src={params.row.img} alt="" />
                    <span className='font-bold'>{params.row.productname}</span>
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
            <UserInfo />
            <ActivityChart data={productData} dataKey={'Sales'} title={'User Spendings'} />
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
