import { AddBusinessOutlined, DeleteForever, PageviewOutlined } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { productsRow } from '../UserData';
import { Link } from 'react-router-dom';




export default function Products() {
    const [row, setRow] = useState(productsRow)

    const columns = [
        { field: 'productId', headerName: 'Product ID', width: 300 },
        { field: 'productname', headerName: 'Productname', width: 300, renderCell: params => {
            return(
                <div className='flex gap-4 items-center'>
                    <img className='w-10 h-10 object-cover rounded-full' src={params.row.img} alt="" />
                    <span className='font-bold'>{params.row.productname}</span>
                </div>
            )
        } },
        { field: 'price', headerName: 'Price', width: 300 },
        { field: 'inStock', headerName: 'In Stock', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
            return(
                <>
                    <Link to={'/product/' + params.row.productId}>
                        <PageviewOutlined titleAccess='View' className='text-blue-800 cursor-pointer' />
                    </Link>
                    <DeleteForever titleAccess='Delete' className='text-red-700 cursor-pointer ml-4' onClick={() => handleDeleteProduct(params.row.productId)} />
                </>
            )
        } }
    ];

    const handleDeleteProduct = (productId) => {
        setRow(prevRow => prevRow.filter(data => data.productId !== productId))
    }
    
  return (
    <div className='w-fit p-8'>
        <h1 className='font-extrabold text-3xl mb-4'>Products List</h1>
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
        <div className='p-8'>
            <Link to={'/create-product'}>
                <button className=' flex gap-2 p-2 border-transparent border-2 text-white bg-green-700 rounded-md hover:bg-green-500'>
                    <AddBusinessOutlined />
                    CREATE NEW PRODUCT
                </button>
            </Link>
        </div>
    </div>
  )
}