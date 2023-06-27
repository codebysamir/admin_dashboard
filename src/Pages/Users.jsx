import { DeleteForever, PageviewOutlined, PersonAddOutlined } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import AlertDialog from '../components/AlertDialog';
import { Skeleton } from '@mui/material';




export default function Users() {
    const { users, loading, error, deleteUserRequest } = useContext(UserContext)
    const [row, setRow] = useState([])
    const [deleteUserModal, setDeleteUserModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState()
    
    useEffect(() => {
        console.log(users)
        console.log(row)
        setRow(users?.map(data => {
            return {
                id: data._id,
                ...data,
            }
        }))
    }, [users])

    
    const columns = [
        { field: 'id', headerName: 'User ID', width: 300 },
        { field: 'username', headerName: 'Username', width: 300, renderCell: params => {
            return(
                <div className='flex gap-4 items-center'>
                    <img className='w-10 h-10 object-cover rounded-full' src={params.row.img} alt="" />
                    <span className='font-bold'>{params.row.username}</span>
                </div>
            )
        } },
        { field: 'email', headerName: 'E-Mail', width: 300 },
        { field: 'isAdmin', headerName: 'Is Admin', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
            return(
                <>
                    <Link to={'/user/' + params.row._id}>
                        <PageviewOutlined className='text-blue-800 hover:text-blue-500 cursor-pointer' />
                    </Link>
                    <DeleteForever className='text-red-700 hover:text-red-500 cursor-pointer ml-4' onClick={() => showAlertDialog(params.row._id)} />
                </>
            )
        } }
    ];

    const showAlertDialog = (id) => {
        setDeleteUserModal(true)
        setIdToDelete(id)
    }

    const handleDeleteUser = (userId) => {
        // setRow(prevRow => prevRow.filter(rowUser => rowUser.userId !== userId))
        console.log(userId)
        const controller = new AbortController()
        deleteUserRequest(controller, userId)
        setDeleteUserModal(false)
    }
    
  return (
    <div className='w-fit p-8 m-8 shadow-2xl dark:text-slate-300'>
        <h1 className='font-extrabold text-3xl mb-4'>Users List</h1>
        {deleteUserModal &&
        <AlertDialog 
            open={deleteUserModal} 
            handleAction={() => handleDeleteUser(idToDelete)}
            handleClose={() => setDeleteUserModal(false)}
            title={'Delete User?'}
            desc={'If you delete this user, it will delete it permanently from the database.'} />}
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
            sx={{color: 'white'}}
        />}
        <div className='p-8'>
            <Link to={'/create-user'}>
                <button className=' flex gap-2 p-2 border-transparent border-2 text-white bg-green-700 rounded-md hover:bg-green-500'>
                    <PersonAddOutlined />
                    CREATE NEW USER
                </button>
            </Link>
        </div>
    </div>
  )
}
