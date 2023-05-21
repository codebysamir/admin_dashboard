import { DeleteForever, PageviewOutlined, PersonAddOutlined } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { userRows } from '../UserData';
import { Link } from 'react-router-dom';




export default function Users() {
    const [row, setRow] = useState(userRows)

    
    const columns = [
        { field: 'userId', headerName: 'User ID', width: 300 },
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
                    <Link to={'/user/' + params.row.userId}>
                        <PageviewOutlined className='text-blue-800 cursor-pointer' />
                    </Link>
                    <DeleteForever className='text-red-700 cursor-pointer ml-4' onClick={() => handleDeleteUser(params.row.userId)} />
                </>
            )
        } }
    ];

    const handleDeleteUser = (userId) => {
        setRow(prevRow => prevRow.filter(rowUser => rowUser.userId !== userId))
    }
    
  return (
    <div className='w-fit p-8 m-8 shadow-2xl'>
        <h1 className='font-extrabold text-3xl mb-4'>Users List</h1>
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
