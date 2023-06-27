import { AttachMoney, CategoryOutlined, FileUpload, Inventory2Outlined, InventoryOutlined } from '@mui/icons-material'
import React, { useContext, useRef, useState } from 'react'
import ProductInfo from '../components/ProductInfo'
import { useLocation } from 'react-router-dom'
import { colorPalette } from '../utils/colorPalette'
import { ProductContext } from '../hooks/ProductContext'
import { CircularProgress } from '@mui/material'

export default function EditUser() {
    const location = useLocation()
    const { state } = location
    const prodNameRef = useRef()
    const prodDescRef = useRef()
    const [image, setImage] = useState()
    const prodPriceRef = useRef()
    const prodCategoriesRef = useRef()
    const prodSizesRef = useRef()
    const [inStock, setInStock] = useState()
    const [color, setColor] = useState()
    const [saveError, setSaveError] = useState(false)
    const { updateProductRequest, loading, error } = useContext(ProductContext)

    console.log('render page')

    
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
    
    async function handleEditProduct(e) {
        e.preventDefault()
        const categoryArr = prodCategoriesRef.current.value.split(',')
        const sizesArr = prodSizesRef.current.value.split(',')
        
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
            const newProduct = {
                title: prodNameRef.current.value,
                desc: prodDescRef.current.value,
                img: b64Image,
                price: prodPriceRef.current.value,
                categories: categoryArr,
                sizes: sizesArr,
                color: color,
                inStock: inStock
            }
            console.log(newProduct)

            const filtered = Object.entries(newProduct).filter(([key, value]) => (value !== '' && value && value[0] !== ''))
            console.log(filtered)

            if (filtered.length === 0) {
                setSaveError(true)
                return
            }
            let updateProduct = {}
            filtered.forEach(([key, value]) => {
                updateProduct = {...updateProduct, [key]: value}
            })
            console.log(updateProduct)

            const controller = new AbortController()
            // controller.abort()
            updateProductRequest(controller, updateProduct, state._id)
            if (saveError) setSaveError(false)
        }
        sendForm()
    }

  return (
    <div className='flex flex-col gap-4 p-12 dark:text-slate-300'>
        <h1 className='font-extrabold text-3xl mb-4'>Edit Product</h1>
        <div className='flex flex-wrap gap-8'>
            <ProductInfo product={state} />
            <form className='p-8 flex flex-col gap-8 shadow-2xl min-w-fit max-w-[50%] flex-grow' method="post" onSubmit={(e) => handleEditProduct(e)}>
                <div>
                    {/* <h2 className='font-extrabold text-3xl mb-4'>Edit Product</h2> */}
                    <span>Choose which field to edit and save it.</span>
                </div>
                <div className='flex flex-wrap gap-20 p-4'>
                    <div className='flex flex-col gap-4'>
                        <input ref={prodNameRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="productname" placeholder={state.title} />
                        <input ref={prodDescRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="desc" placeholder={state.desc} />
                        <input ref={prodPriceRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="number" id="price" placeholder={state.price} />
                        <input ref={prodCategoriesRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="categories" placeholder={state.category.map(cat => cat)} />
                        <input ref={prodSizesRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="sizes" placeholder={state.size.map(size => size)} />
                        <label htmlFor="colors">Create a new color object or choose below from existing colors:</label>
                        <input className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="colors" placeholder='Optional: Create a new color object or choose below' />
                        <div className="flex gap-2 items-center">
                            {Object.entries(colorPalette).map(([colorName, colorHex]) => 
                            <span title={colorName} key={colorName} style={{color: colorHex, backgroundColor: colorHex}} className={`cursor-pointer ${color && color[colorName] === colorHex ? 'border-[5px]' : 'border'} border-black rounded-full w-8 h-8`} onClick={() => handleSetColor(colorName, colorHex)} ></span>)}
                        </div>
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="inStock">In Stock: </label>
                            <input className='border-4 rounded-lg p-2' name='isAdmin' type="checkbox" id="inStock" checked={inStock ?? false} onChange={() => setInStock(prevState => !prevState)}/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 items-center'>
                    <img className='w-56 object-cover rounded-3xl' src={image ? URL.createObjectURL(image) : state.img} alt="" />
                        <div className="flex gap-2">
                            <label htmlFor="imgUpload" className='cursor-pointer'>
                                <FileUpload fontSize='large' className='text-blue-800 hover:text-blue-600' />
                            </label>
                            <input onInput={(e) => setImage(e.target.files[0])} type="file" accept='image/*' id="imgUpload" className='hidden' />
                        </div>
                    </div>
                </div>
                {saveError && <span className='border-4 border-red-600 p-2 w-[450px] font-semibold'>Nothing to edit, please try again and fill out a field to edit.</span>}
                {error && <span className='border-4 border-red-600 p-2 w-[450px] font-semibold'>Oops, theres been an error, please try again or refresh the page.<br/>{error?.message ?? error }</span>}
                {loading ? <CircularProgress className='mx-20'  />
                    :
                    <button type='submit' className='border-transparent border-2 bg-blue-800 text-white hover:bg-blue-600 p-2 rounded-md w-56 font-semibold transition-all'>SAVE</button>}
            </form>
        </div>
    </div>
  )
}
