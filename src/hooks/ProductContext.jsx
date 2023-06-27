import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from './useFetch'
import { AuthContext } from './AuthContext'

const LOCAL = import.meta.env.VITE_LOCAL

export const ProductContext = createContext({
    loading: Boolean,
    error: String,
    productsSales: [],
    products: [],
    product: {},
    setProducts: () => {},
    getAllProductsRequest: () => {},
    getProductRequest: () => {},
    createProductRequest: () => {},
    updateProductRequest: () => {},
    deleteProductRequest: () => {},
    getMonthlySoldProductRequest: () => {},
})

export default function ProductProvider({children}) {
    const { accessToken } = useContext(AuthContext)
    const [productsSales, setProductsSales] = useState([])
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()
    const fetchInceptor = useFetch()

    const getAllProductsRequest = async (controller) => {
        setLoading(true)
        setError()
        try {
            const request = await fetch(LOCAL + '/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal
            })
            const response = await request.json()
            console.log(response)
            setProducts(response)
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('product request failed, error: ' + err)
            } else {
                console.log('product request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const getProductRequest = async (controller, id) => {
        setLoading(true)
        setError()
        try {
            const request = await fetch(LOCAL + `/api/products/find/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal
            })
            const response = await request.json()
            console.log(response)
            setProduct(response)
            return response
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('product request failed, error: ' + err)
            } else {
                console.log('product request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const createProductRequest = async (controller, product) => {
        setLoading(true)
        setError()

        // const formData = new FormData()
        // Object.entries(product).forEach(([key, value]) => formData.append(key, value))
        // console.log(formData)

        try {
            const request = await fetchInceptor(LOCAL + '/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken,
                },
                signal: controller.signal,
                body: JSON.stringify(product)
            })
            const response = await request.json()
            console.log(response)
            if (!request.ok) {
                setError(response)
                return
            } else {
                setProducts(prevProducts => [...prevProducts, response])
                navigate(-1)
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('product request failed, error: ' + err)
            } else {
                console.log('product request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const updateProductRequest = async (controller, product, id) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/products/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken,
                },
                signal: controller.signal,
                body: JSON.stringify(product)
            })
            console.log(request)
            const response = await request.json()
            console.log(response)
            if (!request.ok) {
                setError(response)
                return
            } else {
                navigate(-1)
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('product request failed, error: ' + err)
            } else {
                console.log('product request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }


    const deleteProductRequest = async (controller, id) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/products/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken,
                },
                signal: controller.signal,
            })
            console.log(request)
            const response = await request.json()
            console.log(response)
            if (!request.ok) {
                setError(response)
                return
            } else {
                setProducts(prevProducts => prevProducts.filter(product => product._id !== id))
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('product request failed, error: ' + err)
            } else {
                console.log('product request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }


    const getMonthlySoldProductRequest = async (controller) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/products/stats/sales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken,
                },
                signal: controller.signal,
            })
            console.log(request)
            const response = await request.json()
            console.log(response)
            if (!request.ok) {
                setError(response)
                return
            } else {
                setProductsSales(response)
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('product request failed, error: ' + err)
            } else {
                console.log('product request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        getAllProductsRequest(controller)
        return () => controller.abort()
      }, [])

    const productValue = {
        error,
        loading,
        productsSales,
        products,
        product,
        setProducts,
        getAllProductsRequest,
        getProductRequest,
        createProductRequest,
        updateProductRequest,
        deleteProductRequest,
        getMonthlySoldProductRequest,
    }

  return (
    <ProductContext.Provider value={productValue}>
        {children}
    </ProductContext.Provider>
  )
}
