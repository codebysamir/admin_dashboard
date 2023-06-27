import React, { useContext, useRef, useState } from 'react'
import productPreview from "../assets/preview.png"
import { FileUpload } from '@mui/icons-material'
import { ProductContext } from '../hooks/ProductContext'
import { colorPalette } from '../utils/colorPalette'
import { CircularProgress } from '@mui/material'

export default function CreateProduct() {
    const prodNameRef = useRef()
    const prodDescRef = useRef()
    const [image, setImage] = useState()
    const [imageError, setImageError] = useState()
    const prodPriceRef = useRef()
    const prodCategoriesRef = useRef()
    const prodSizesRef = useRef()
    const prodInStockRef = useRef()
    const [color, setColor] = useState()
    const { createProductRequest, loading, error } = useContext(ProductContext)

    console.log('render')

    function handleSetColor(colorName, colorHex) {
        setColor(prevColor => {
            if (!prevColor) return {[colorName]: colorHex}
            if (prevColor[colorName]) {
                const { [colorName]: del, ...rest } = prevColor
                return rest
            }
            return {...prevColor, [colorName]: colorHex}
        })
    }

    function handleCreateProduct(e) {
        e.preventDefault()
        const categoryArr = prodCategoriesRef.current.value.split(' ')
        const sizesArr = prodSizesRef.current.value.split(' ')
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
            const newProduct = {
                title: prodNameRef.current.value,
                desc: prodDescRef.current.value,
                img: b64Image,
                price: prodPriceRef.current.value,
                categories: categoryArr,
                sizes: sizesArr,
                color: color,
                inStock: prodInStockRef.current.checked ? true : false
            }
            console.log(newProduct)
            const controller = new AbortController()
            // controller.abort()
            createProductRequest(controller, newProduct)
        }

        sendForm()
    }

  return (
    <div className='flex flex-col gap-4 p-12 bg-slate-50 dark:bg-slate-800 dark:text-slate-300'>
        <h1 className='font-extrabold text-3xl mb-4'>Create Product</h1>
        <div className='flex gap-8'>
            <form className='p-8 flex flex-col gap-8 shadow-2xl w-fit' method="post" onSubmit={(e) => handleCreateProduct(e)}>
                <span>All fields need to be filled out.</span>
                <div className='flex gap-28 p-4'>
                    <div className='flex flex-col gap-4'>
                        <input ref={prodNameRef} required className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="productname" placeholder='Enter productname' />
                        <input ref={prodDescRef} required className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="desc" placeholder='Enter Description' />
                        <input ref={prodPriceRef} required className='border-4 rounded-lg p-2 dark:bg-slate-800' type="number" id="price" placeholder='Enter price' />
                        <input ref={prodCategoriesRef} required className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="categories" placeholder='Enter categories' />
                        <input ref={prodSizesRef} required className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="sizes" placeholder='Enter sizes' />
                        <label htmlFor="colors">Create a new color object or choose below from existing colors:</label>
                        <input className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="colors" placeholder='Create a new color object or' />
                        <div className="flex gap-2 items-center">
                            {Object.entries(colorPalette).map(([colorName, colorHex]) => 
                            <span title={colorName} key={colorName} style={{color: colorHex, backgroundColor: colorHex}} className={`cursor-pointer ${color && color[colorName] === colorHex ? 'border-[5px]' : 'border'} border-black rounded-full w-8 h-8`} onClick={() => handleSetColor(colorName, colorHex)} ></span>)}
                        </div>
                        {(!color || !Object.keys(color).length) && <span className='w-48 border-4 border-yellow-500 p-4 font-bold'>Choose color to save</span>}
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="inStock">In Stock: </label>
                            <input ref={prodInStockRef} className='border-4 rounded-lg p-2' name='isAdmin' type="checkbox" id="inStock" value='true' />
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img className='w-80 object-cover rounded-3xl' src={image ? URL.createObjectURL(image) : productPreview} alt="" />
                        <div className="flex gap-2">
                            <label htmlFor="imgUpload" className='cursor-pointer'>
                                <FileUpload fontSize='large' className='text-blue-800 hover:text-blue-600' />
                            </label>
                            <input onInput={(e) => setImage(e.target.files[0])} type="file" accept='image/*' id="imgUpload" className='hidden' />
                        </div>
                        {imageError && <span className='border-2 border-red-600 p-2 font-semibold'>{imageError}</span>}
                    </div>
                </div>
                {error && <span className='border-4 border-red-600 p-2 w-[450px] font-semibold'>Oops, theres been an error, please try again or refresh the page.<br/>{error?.message ?? error }</span>}
                {loading ? <CircularProgress className='mx-20' />
                :
                <button type='submit' className='border-transparent border-2 bg-blue-800 text-white hover:bg-blue-600 p-2 rounded-md w-56 font-semibold transition-all'>SAVE</button>
                }
            </form>
        </div>
    </div>
  )
}
