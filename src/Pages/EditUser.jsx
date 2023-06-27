import { AdminPanelSettings, FileUpload, MailOutline, PersonOutline } from '@mui/icons-material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import UserInfo from '../components/UserInfo'
import { UserContext } from '../hooks/UserContext'
import { useParams } from 'react-router-dom'
import { CircularProgress, Skeleton } from '@mui/material'

export default function EditUser() {
    const userNameRef = useRef()
    const userEmailRef = useRef()
    const [image, setImage] = useState()
    const userPasswordRef = useRef()
    const [isAdmin, setIsAdmin] = useState()
    const [saveError, setSaveError] = useState(false)
    const { id: userId } = useParams()
    const { getUserRequest, updateUserRequest, user, loading, error } = useContext(UserContext)

    console.log('render')

    useEffect(() => {
        const controller = new AbortController()
        getUserRequest(controller, userId)

        return () => controller.abort()
    }, [])


    async function handleEditUser(e) {
        e.preventDefault()
        let b64Image

        function loadImage(imgFile) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
          
              reader.onload = () => {
                const dataUri = reader.result;
                resolve(dataUri);
              };
          
              reader.onerror = () => {
                reject(new Error('Failed to load the image.'));
              };
          
              reader.readAsDataURL(imgFile);
            });
        }
        
        async function processImageFile(imgFile) {
            try {
              b64Image = await loadImage(imgFile);
              // Perform additional processing with the dataUri
              console.log('Image processing completed successfully.');
            } catch (error) {
                console.error('Image processing failed:', error);
            }
        }
        
        async function sendForm() {
            if (image) await processImageFile(image) 
            console.log(b64Image)
            const newUser = {
                username: userNameRef.current.value,
                email: userEmailRef.current.value,
                password: userPasswordRef.current.value,
                img: b64Image,
                isAdmin: isAdmin
            }
            console.log(newUser)

            const filtered = new Map(Object.entries(newUser).filter(([key, value]) => (value !== '' && value && value[0] !== '')))
            console.log(filtered)

            if (filtered.length === 0) {
                setSaveError(true)
                return
            }
            // let updateUser = {}
            // filtered.forEach(([key, value]) => {
            //     updateUser = {...updateUser, [key]: value}
            // })
            const updatedUser = Object.fromEntries(filtered)
            console.log(updatedUser)

            const controller = new AbortController()
            // controller.abort()
            updateUserRequest(controller, updatedUser, userId)
            if (saveError) setSaveError(false)
        }
        sendForm()
    }

  return (
    <div className='flex flex-col gap-4 p-12 dark:text-slate-300'>
        <h1 className='font-extrabold text-3xl mb-4'>Edit User</h1>
        <div className='flex flex-wrap gap-8'>
            {loading ?
            <div className='shadow-2xl w-[600px] flex flex-col flex-grow p-8 gap-8'>
                <Skeleton variant='text' sx={{ fontSize: '2rem'}} width={200}/>
                <div className='flex gap-4'>
                    <Skeleton variant='circular' width={200} height={200}/>
                    <Skeleton variant='rounded' width={400} height={200}/>
                </div>
            </div>
            :
            <UserInfo user={user} />}
            <form className='p-8 flex flex-col gap-8 shadow-xl min-w-fit flex-grow' action="" method="post" onSubmit={(e) => handleEditUser(e)}>
                <span>Choose which field to edit and save it.</span>
                <div className='flex flex-wrap gap-28 p-4'>
                    <div className='flex flex-col gap-4'>
                        <input ref={userNameRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="username" placeholder='Enter new username' />
                        <input ref={userEmailRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="email" placeholder='Enter new email' />
                        <input ref={userPasswordRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="password" placeholder='Enter new password' />
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="isAdmin">Is Admin: </label>
                            <input className='border-4 rounded-lg p-2' name='isAdmin' type="checkbox" id="isAdmin" checked={isAdmin ?? false} onChange={() => setIsAdmin(prevState => !prevState)} />
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <img className='w-36 h-36 object-cover rounded-3xl' src={image ? URL.createObjectURL(image) : user?.img} alt="" />
                        <div className="flex gap-2">
                            <label htmlFor="imgUpload" className='cursor-pointer'>
                                <FileUpload fontSize='large' className='text-blue-800 hover:text-blue-600' />
                            </label>
                            <input type="file" accept='image/*' id="imgUpload" className='hidden' onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                    </div>
                </div>
                {saveError && <span className='border-4 border-red-600 p-2 w-[450px] font-semibold'>Nothing to edit, please try again and fill out a field to edit.</span>}
                {error && <span className='border-4 border-red-600 p-2 w-[450px] font-semibold'>Oops, theres been an error, please try again or refresh the page.<br/>{error?.message ?? error }</span>}
                {loading ? <CircularProgress className='mx-20' />
                :
                <button className='border-transparent border-2 bg-blue-800 text-white hover:bg-blue-600 p-2 rounded-md w-56 font-semibold transition-all'>SAVE</button>
                }
            </form>
        </div>
    </div>
  )
}
