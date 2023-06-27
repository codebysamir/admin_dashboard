import React, { useContext, useRef, useState } from 'react'
import userPreview from "../assets/user.png"
import { FileUpload } from '@mui/icons-material'
import { UserContext } from '../hooks/UserContext'
import { CircularProgress } from '@mui/material'

export default function CreateUser() {
    const userNameRef = useRef()
    const userEmailRef = useRef()
    const userPasswordRef = useRef()
    const [image, setImage] = useState()
    const userIsAdminRef = useRef()
    const { createUserRequest, loading, error } = useContext(UserContext)

    function handleCreateUser(e) {
        e.preventDefault()
        let b64Image
        
        const loadImage = (imageFile) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => {
                    resolve(reader.result)
                }
                
                reader.onerror = () => {
                    reject(new Error('Failed to load the image.'))
                }

                reader.readAsDataURL(imageFile);
            })
        } 

        const processImage = async (imageFile) => {
            try {
                b64Image = await loadImage(imageFile)
            } catch (err) {
                console.error('Image processing failed:', err);
            }
        }

        const sendForm = async () => {
            if (!image) return setImageError('Please upload an image')
            await processImage(image)
            const newUser = {
                username: userNameRef.current.value,
                email: userEmailRef.current.value,
                password: userPasswordRef.current.value,
                img: b64Image,
                isAdmin: userIsAdminRef.current.checked ? true : false
            }
            console.log(newUser)
            const controller = new AbortController()
            // controller.abort()
            createUserRequest(controller, newUser)
        }

        sendForm()
    }

  return (
    <div className='flex flex-col gap-4 p-12 dark:text-slate-300'>
        <h1 className='font-extrabold text-3xl mb-4'>Create User</h1>
        <div className='flex gap-8'>
            <form className='p-8 flex flex-col gap-8 shadow-2xl w-fit' method="post" onSubmit={(e) => handleCreateUser(e)}>
                <span>All fields need to be filled out.</span>
                <div className='flex gap-28 p-4'>
                    <div className='flex flex-col gap-4'>
                        <input required ref={userNameRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="username" placeholder='Enter username' />
                        <input required ref={userEmailRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="email" placeholder='Enter email' />
                        <input required ref={userPasswordRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="password" placeholder='Enter password' />
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="isAdmin">Is Admin: </label>
                            <input ref={userIsAdminRef} className='border-4 rounded-lg p-2' name='isAdmin' type="checkbox" id="isAdmin" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 items-center'>
                        <img className='w-36 h-36 object-cover rounded-3xl' src={image ? URL.createObjectURL(image) : userPreview} alt="" />
                        <div className="flex gap-2">
                            <label htmlFor="imgUpload" className='cursor-pointer'>
                                <FileUpload fontSize='large' className='text-blue-800 hover:text-blue-600' />
                            </label>
                            <input type="file" accept='image/*' id="imgUpload" className='hidden' onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                    </div>
                </div>
                {error && <span className='border-4 border-red-600 p-2 w-[450px] font-semibold'>Oops, theres been an error, please try again or refresh the page.<br/>{error?.message ?? error }</span>}
                {loading ? <CircularProgress className='mx-20'  />
                :
                <button className='border-transparent border-2 bg-blue-800 text-white hover:bg-blue-600 p-2 rounded-md w-56 font-semibold transition-all'>SAVE</button>
                }
            </form>
        </div>
    </div>
  )
}
