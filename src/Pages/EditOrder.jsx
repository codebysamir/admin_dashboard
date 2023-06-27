import React, { useContext, useEffect, useRef, useState } from 'react'
import productPreview from "../assets/preview.png"
import { AddCircleOutline, HighlightOffOutlined, RemoveCircleOutline } from '@mui/icons-material'
import { OrderContext } from '../hooks/OrderContext'
import { CircularProgress } from '@mui/material'
import { ProductContext } from '../hooks/ProductContext'
import { useLocation, useParams } from 'react-router-dom'

export default function EditOrder() {
    const location = useLocation()
    const { state } = location
    const { id: orderId } = useParams()
    const userIdRef = useRef()
    const stripeIdRef = useRef()
    const productsIdRef = useRef()
    const productsQuantityRef = useRef()
    const productsSizeRef = useRef()
    const productsColorRef = useRef()
    const [productsList, setProductsList ] = useState([...state?.products])
    // const amountRef = useRef()
    const [amount, setAmount] = useState(0)
    const addressCityRef = useRef()
    const addressCountryRef = useRef()
    const addressStreetRef = useRef()
    const addressPostalCodeRef = useRef()
    const statusRef = useRef()
    const { updateOrderRequest, loading, error } = useContext(OrderContext)
    const { products, loading: loadingProducts } = useContext(ProductContext)
    const [saveError, setSaveError] = useState()
    const [newProduct, setNewProduct] = useState()

    console.log('render')

    function handleEditOrder(e) {
        e.preventDefault()
        if (!productsList.length) return setSaveError('No products are listed, please add products.')
        
        const productisEqual = JSON.stringify(productsList) === JSON.stringify(state?.products)
        const amountisEqual =  amount === state?.amount

        const newOrder = {
            userId: userIdRef.current.value,
            stripeId: stripeIdRef.current.value ?? null,
            amount: !amountisEqual ? amount : null,
            address: {
                city: addressCityRef.current.value,
                country: addressCountryRef.current.value,
                line1: addressStreetRef.current.value,
                postal_code: addressPostalCodeRef.current.value
            },
            status: statusRef.current.value,
            products: !productisEqual ? productsList : null,
        }
        console.log(newOrder)

        
        const filtered = Object.entries(newOrder).filter(([key, value]) => {
            console.log(typeof value)
            if (value !== '' && value && value[0] !== '') {
                // if (typeof value === 'object' && value !== null) {
                //     // console.log(value)
                //     // const valueOfValue = Object.entries(value).filter(([key, value]) => value !== '')
                //     // if (valueOfValue.length > 0) {
                //         //     return true
                //     //     // Object.fromEntries(valueOfValue)
                //     // }
                // } else {
                // }
                return true
            } 
        })
        console.log(filtered)

        if (filtered.length === 0) {
            setSaveError('Nothing to edit, please try again and fill out a field to edit.')
            return
        }

        const updatedOrder = Object.fromEntries(filtered)
        console.log(updatedOrder)

        const filteredAddress = !updatedOrder.address ? null : Object.entries(updatedOrder.address).filter(([key, value]) => value !== '')
        console.log(filteredAddress)

        if (updatedOrder.address && filteredAddress) updatedOrder.address = {...state.address, ...Object.fromEntries(filteredAddress)}
        console.log(updatedOrder)

        const controller = new AbortController()
        updateOrderRequest(controller, updatedOrder, orderId)
        if (saveError) setSaveError()
    }

    function handleAddToProductsList() {
        console.log(productsIdRef.current.value)
        console.log(productsSizeRef.current.value)
        console.log(Object.keys(JSON.parse(productsColorRef.current.value))[0])
        console.log(productsList)
        let quantity = productsList.find(prod => prod.productId === productsIdRef.current.value && prod.size === productsSizeRef.current.value && Object.keys(prod.color)[0] === Object.keys(JSON.parse(productsColorRef.current.value))[0])?.quantity

        if (quantity) {
            setProductsList([
                ...productsList.filter(prod => prod.productId !== productsIdRef.current.value || prod.size !== productsSizeRef.current.value || Object.keys(prod.color)[0] !== Object.keys(JSON.parse(productsColorRef.current.value))[0]),
                {
                    productId: productsIdRef.current.value,
                    quantity: Number(productsQuantityRef.current.value) + Number(quantity),
                    size: productsSizeRef.current.value,
                    color: JSON.parse(productsColorRef.current.value)
                }
            ])
        } else {
            setProductsList([
                ...productsList,
                {
                    productId: productsIdRef.current.value,
                    quantity: productsQuantityRef.current.value,
                    size: productsSizeRef.current.value,
                    color: JSON.parse(productsColorRef.current.value)
                }
            ])
        }

        productsIdRef.current.value = ''
        productsQuantityRef.current.value = ''
        setNewProduct()
    }
    
    function handleDeleteFromProductsList(prodDel) {
        const prodToDelete = prodDel 

        let quantity = prodToDelete?.quantity

        if (quantity > 1) {
            setProductsList([
                ...productsList.filter(prod => prod.productId !== prodToDelete.productId || prod.size !== prodToDelete.size || Object.keys(prod.color)[0] !== Object.keys(prodToDelete.color)[0]),
                {
                    productId: prodToDelete.productId,
                    quantity: Number(prodToDelete.quantity) - 1,
                    size: prodToDelete.size,
                    color: prodToDelete.color
                }
            ])
        } else {
            setProductsList(productsList.filter(prod => prod.productId !== prodToDelete.productId || prod.size !== prodToDelete.size || Object.keys(prod.color)[0] !== Object.keys(prodToDelete.color)[0]))
        }
    }

    function handleLoadProduct() {
        if (productsIdRef.current?.value) setNewProduct(products.find(product => product._id === productsIdRef.current?.value))
    }
    
    useEffect(() => {
        if (productsQuantityRef.current.value !== 1) productsQuantityRef.current.value = 1

        console.log(products)
        if (productsList.length) productsList.forEach(prod => {
                const prodDetails = products.find(dbProd => dbProd._id === prod.productId)
                setAmount(prevAmount => prevAmount + (prodDetails?.price * prod.quantity))
            })
        
        return () => setAmount(0)
    }, [productsList])

  return (
    <div className='flex flex-col gap-4 p-12 dark:text-slate-300'>
        <h1 className='font-extrabold text-3xl mb-4'>Edit Order</h1>
        <div className='flex gap-8'>
            <form className='p-8 flex flex-col gap-8 shadow-2xl w-fit' method="post" onSubmit={(e) => handleEditOrder(e)}>
                <span>At least one field needs to be filled out to edit</span>
                <div className='flex gap-28 p-4'>
                    <div className='flex flex-col gap-4 min-w-[650px]'>
                        <input ref={userIdRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="userId" placeholder={'User ID: ' + state?.userId} />
                        <input ref={stripeIdRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="stripeId" placeholder={'Stripe ID: ' + state?.stripeId ?? 'none'} />
                        <input ref={addressCityRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="addressCity" placeholder={'City: ' + state?.address?.city ?? 'none'} />
                        <input ref={addressCountryRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="addressCountry" placeholder={'Country: ' + state?.address?.country ?? 'none'} />
                        <input ref={addressStreetRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="addressStreet" placeholder={'Street: ' + state?.address?.line1 ?? 'none'} />
                        <input ref={addressPostalCodeRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="addressPostalCode" placeholder={'Postal Code: ' + state?.address?.postal_code ?? 'none'} />
                        <input ref={statusRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="status" placeholder={'Status: ' + state?.status} />
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col gap-4'>
                            <h3 className='font-bold text-2xl'>Products</h3>
                            {productsList?.length > 0 ? productsList.map(prod => {
                                return (
                                    <div key={(prod.size && prod.color) ? prod.productId + prod.size + Object.keys(prod.color)[0]: prod.productId} className='flex gap-2'>
                                       <span>ID: {prod.productId}</span>
                                        / 
                                       <span>Quantity: {prod.quantity}</span>
                                        / 
                                       <span>Size: {prod?.size ?? 'No size'}</span>
                                        / 
                                       <span>Color: {prod?.color ? Object.keys(prod?.color)[0] : 'No color'}</span>
                                       <div className='cursor-pointer' onClick={() => handleDeleteFromProductsList(prod)} >
                                        {prod.quantity > 1 ?
                                            <RemoveCircleOutline className='text-blue-800 hover:text-red-600' />
                                        :
                                            <HighlightOffOutlined className='text-red-800 hover:text-red-600' />}
                                       </div>
                                    </div>
                                )
                            })
                            : <span>No Products added</span>}
                            <div className='flex gap-2 items-center border-t-4 pt-4'>
                                <input ref={productsIdRef} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="text" id="colors" placeholder='Product ID' onInput={handleLoadProduct} />
                                <input ref={productsQuantityRef} min={1} className='border-4 rounded-lg p-2 dark:bg-slate-800' type="number" id="quantity" placeholder='Product Quantity' />
                                {newProduct &&
                                <select ref={productsColorRef} className='border-4 rounded-lg p-2' onChange={(e) => console.log(JSON.parse(e.target.value))} >
                                    {Object.entries(newProduct?.color).map(([colorName, colorHex]) => <option style={{backgroundColor: colorHex}} key={colorName} value={JSON.stringify({ [colorName]:colorHex })}>{colorName}</option> )}
                                </select>}
                                {newProduct &&
                                <select ref={productsSizeRef} className='border-4 rounded-lg p-2' onChange={(e) => console.log(e.target.value)} >
                                    {newProduct?.size.map(size => <option key={size} value={size}>{size}</option> )}
                                </select>}
                                <AddCircleOutline className='text-blue-800 hover:text-blue-500 cursor-pointer' fontSize='large' onClick={handleAddToProductsList} />
                            </div>
                            <div className='flex gap-4'>
                                <span className='font-semibold text-xl'>Total Amount: </span>
                                <span className='text-xl'>{amount} CHF</span>
                            </div>
                        </div>
                    </div>
                </div>
                {saveError && <span className='border-4 border-yellow-600 p-2 w-[450px] font-semibold'>{saveError}</span>}
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
