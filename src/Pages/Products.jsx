import { AddBusinessOutlined, DeleteForever, PageviewOutlined } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ProductContext } from '../hooks/ProductContext';
import { Dialog, DialogActions, DialogTitle, Skeleton } from '@mui/material';
import AlertDialog from '../components/AlertDialog';

const LOCAL = import.meta.env.VITE_LOCAL


export default function Products() {
    const { products, loading, error, deleteProductRequest } = useContext(ProductContext)
    const [row, setRow] = useState([])
    const [deleteProductModal, setDeleteProductModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState()
    
    useEffect(() => {
        setRow(products.map(data => {
            return {
                id: data._id,
                ...data,
                inStock: true
            }
        }))
    }, [products])

    const columns = [
        { field: 'id', headerName: 'Product ID', width: 200 },
        { field: 'title', headerName: 'Productname', width: 500, renderCell: params => {
            return(
                <div className='flex gap-4 items-center'>
                    <img className='w-10 h-10 object-cover rounded-full' src={params.row.img} alt="" />
                    <span className='font-bold'>{params.row.title}</span>
                </div>
            )
        } },
        { field: 'price', headerName: 'Price in CHF', width: 150 },
        { field: 'category', headerName: 'Category', width: 300 },
        { field: 'inStock', headerName: 'In Stock', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
            return(
                <>
                    <Link to={'/product/' + params.row.id} state={{productId: params.row._id}}>
                        <PageviewOutlined titleAccess='View' className='text-blue-800 hover:text-blue-500 cursor-pointer' />
                    </Link>
                    <DeleteForever titleAccess='Delete' className='text-red-700 hover:text-red-500 cursor-pointer ml-4' onClick={() => showAlertDialog(params.row_id)} />
                </>
            )
        } }
    ];

    const showAlertDialog = (id) => {
        setDeleteProductModal(true)
        setIdToDelete(id)
    }

    const handleDeleteProduct = (productId) => {
        // setRow(prevRow => prevRow.filter(data => data.productId !== productId))
        console.log(productId)
        const controller = new AbortController()
        deleteProductRequest(controller, productId)
        setDeleteProductModal(false)
    }
    
  return (
    <div className='w-full p-8 dark:text-slate-300 bg-slate-50 dark:bg-slate-800'>
        <h1 className='font-extrabold text-3xl mb-4'>Products List</h1>
        {deleteProductModal &&
        <AlertDialog 
            open={deleteProductModal} 
            handleAction={() => handleDeleteProduct(idToDelete)}
            handleClose={() => setDeleteProductModal(false)}
            title={'Delete Product?'}
            desc={'If you delete this product, it will delete it permanently from the database.'} />}
        {error && 
        <div className='border-2 border-red-600 p-4'>
            <span>Oops, there went something wrong. Please try again or reload the page.</span>
            <br/>
            <span>{error?.message ?? error}</span>
        </div>}
        {loading ? 
        // <span>Loading...</span> 
        <Skeleton variant='rounded' height={400} width={1200} />
        :
        <DataGrid
            rows={row}
            columns={columns}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            className='dark:text-slate-300'
        />}
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