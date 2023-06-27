import { DeleteForever, PageviewOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogTitle, Skeleton } from '@mui/material';
import AlertDialog from '../components/AlertDialog';
import { OrderContext } from '../hooks/OrderContext';
import { UserContext } from '../hooks/UserContext';
import { ProductContext } from '../hooks/ProductContext';


export default function Orders() {
    const { orders, loading, error, deleteOrderRequest } = useContext(OrderContext)
    const { users } = useContext(UserContext)
    const { products } = useContext(ProductContext)
    const [row, setRow] = useState([])
    const [deleteOrderModal, setDeleteOrderModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState()
    
    useEffect(() => {
        console.log(users)
        const orderObj = orders.map(data => {
            const user = users.find(dbUser => dbUser._id === data.userId)
            return {
                id: data._id,
                ...data,
                username: user?.username ?? null,
                userImg: user?.img ?? null,
            }
        })
        console.log(orderObj)

        setRow([
            ...orderObj
        ])
    }, [orders])

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 200 },
        { field: 'products', headerName: 'Products', width: 200, renderCell: params => {
                return(
                <div className='flex w-full'>
                    {params.row.products.map(product => {
                        const foundProduct = products.find(dbProduct => dbProduct._id === product.productId)
                        return (
                            <div key={product.productId} className='relative'>
                                <img className='w-10 h-10 object-cover rounded-full' src={foundProduct?.img} alt="" />
                                {product.quantity > 1 && <span className='absolute bottom-0 text-white bg-black w-5 h-5 rounded-full text-center border-2'>{product.quantity}</span>}
                            </div>
                        )
                    }
                    )}
                </div>
            )
        } },
        { field: 'userId', headerName: 'User ID', width: 200 },
        { field: 'username', headerName: 'Username', width: 150, renderCell: params => {
            return(
                <div className='flex gap-4 items-center'>
                    {params.row.username && 
                    <>
                        <img className='w-10 h-10 object-cover rounded-full' src={params.row.userImg} alt="" />
                        <span className='font-bold'>{params.row.username}</span>
                    </>}
                </div>
            )
        } },
        { field: 'amount', headerName: 'Total in CHF', width: 100 },
        { field: 'address', headerName: 'Address', width: 120, renderCell: params => {
            return (
                <div className='flex flex-col justify-evenly'>
                    <span className='font-semibold'>{params.row.address.city}</span>
                    <span className='font-semibold'>{params.row.address.country}</span>
                </div>
            )
        } },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'stripeId', headerName: 'Stripe Id', width: 180 },
        { field: 'createdAt', headerName: 'Created At', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
            return(
                <>
                    <Link to={'/order/' + params.row.id} state={{userId: params.row.userId}}>
                        <PageviewOutlined titleAccess='View' className='text-blue-800 hover:text-blue-500 cursor-pointer' />
                    </Link>
                    <DeleteForever titleAccess='Delete' className='text-red-700 hover:text-red-500 cursor-pointer ml-4' onClick={() => showAlertDialog(params.row_id)} />
                </>
            )
        } }
    ];

    const showAlertDialog = (id) => {
        setDeleteOrderModal(true)
        setIdToDelete(id)
    }

    const handleDeleteOrder = (orderId) => {
        // setRow(prevRow => prevRow.filter(data => data.orderId !== orderId))
        console.log(orderId)
        const controller = new AbortController()
        deleteOrderRequest(controller, orderId)
        setDeleteOrderModal(false)
    }
    
  return (
    <div className='w-fit p-8 bg-slate-50 dark:bg-slate-800 dark:text-slate-300'>
        <h1 className='font-extrabold text-3xl mb-4'>Orders List</h1>
        {deleteOrderModal &&
        <AlertDialog 
            open={deleteOrderModal} 
            handleAction={() => handleDeleteOrder(idToDelete)}
            handleClose={() => setDeleteOrderModal(false)}
            title={'Delete Order?'}
            desc={'If you delete this order, it will delete it permanently from the database.'} />}
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
                    paginationModel: { page: 0, pageSize: 50 },
                },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            className='dark:text-slate-300'
        />}
        <div className='p-8'>
            <Link to={'/create-order'}>
                <button className=' flex gap-2 p-2 border-transparent border-2 text-white bg-green-700 rounded-md hover:bg-green-500'>
                    <ShoppingBagOutlined />
                    CREATE NEW ORDER
                </button>
            </Link>
        </div>
    </div>
  )
}