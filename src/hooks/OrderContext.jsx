import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from './useFetch'
import { AuthContext } from './AuthContext'

const LOCAL = import.meta.env.VITE_LOCAL

export const OrderContext = createContext({
    loading: Boolean,
    error: String,
    newestOrders: [],
    income: [],
    stats: [],
    orders: [],
    order: {},
    setOrders: () => {},
    getAllOrdersRequest: () => {},
    getOrderRequest: () => {},
    createOrderRequest: () => {},
    updateOrderRequest: () => {},
    deleteOrderRequest: () => {},
    getUserOrderIncomeStatsRequest: () => {},
    getProductOrderIncomeStatsRequest: () => {},
    getMonthlyIncomeRequest: () => {},
})

export default function OrderProvider({children}) {
    const { accessToken } = useContext(AuthContext)
    const [newestOrders, setNewestOrders] = useState([])
    const [income, setIncome] = useState([])
    const [stats, setStats] = useState([])
    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()
    const fetchInceptor = useFetch()

    const getAllOrdersRequest = async (controller, params) => {
        setLoading(true)
        setError()
        try {
            const request = await fetchInceptor(!params ? LOCAL + '/api/orders' : LOCAL + '/api/orders?' + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: 'Bearer ' + accessToken,
            },
            signal: controller.signal
            })
            console.log(request)
            const response = await request.json()
            console.log(response)
            if (!request.ok) return setError(response)
            if (params) return setNewestOrders(response)
            setOrders(response)
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('order request failed, error: ' + err)
            } else {
                console.log('order request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const getOrderRequest = async (controller, id) => {
        setLoading(true)
        setError()
        try {
            const request = await fetchInceptor(LOCAL + `/api/orders/find/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: 'Bearer ' + accessToken,
            },
            signal: controller.signal
            })
            const response = await request.json()
            console.log(response)
            setOrder(response)
            return response
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('order request failed, error: ' + err)
            } else {
                console.log('order request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const createOrderRequest = async (controller, order) => {
        setLoading(true)
        setError()

        // const formData = new FormData()
        // Object.entries(order).forEach(([key, value]) => formData.append(key, value))
        // console.log(formData)

        try {
            const request = await fetchInceptor(LOCAL + '/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken,
                },
                signal: controller.signal,
                body: JSON.stringify(order)
            })
            const response = await request.json()
            console.log(response)
            if (!request.ok) {
                setError(response)
                return
            } else {
                setOrders(prevOrders => [...prevOrders, response])
                navigate(-1)
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('order request failed, error: ' + err)
            } else {
                console.log('order request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const updateOrderRequest = async (controller, order, id) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/orders/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken,
                },
                signal: controller.signal,
                body: JSON.stringify(order)
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
                console.log('order request failed, error: ' + err)
            } else {
                console.log('order request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }


    const deleteOrderRequest = async (controller, id) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/orders/' + id, {
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
                setOrders(prevOrders => prevOrders.filter(order => order._id !== id))
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('order request failed, error: ' + err)
            } else {
                console.log('order request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }
    
    const getUserOrderIncomeStatsRequest = async (controller, id) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/orders/income/user/' + id, {
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
                setStats(response.toSorted((a, b) => a._id - b._id))
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('order request failed, error: ' + err)
            } else {
                console.log('order request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }
    
    const getProductOrderIncomeStatsRequest = async (controller, id) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/orders/income/product/' + id, {
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
                setStats(response.toSorted((a, b) => a._id - b._id))
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('order request failed, error: ' + err)
            } else {
                console.log('order request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }
    
    const getMonthlyIncomeRequest = async (controller) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/orders/income', {
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
                const sortedResponse = response.toSorted((a, b) => b._id - a._id)
                console.log(sortedResponse)
                setIncome(sortedResponse)
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('order request failed, error: ' + err)
            } else {
                console.log('order request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        getAllOrdersRequest(controller)
        return () => controller.abort()
      }, [])

    const orderValue = {
        error,
        loading,
        newestOrders,
        income,
        stats,
        orders,
        order,
        setOrders,
        getAllOrdersRequest,
        getOrderRequest,
        createOrderRequest,
        updateOrderRequest,
        deleteOrderRequest,
        getUserOrderIncomeStatsRequest,
        getProductOrderIncomeStatsRequest,
        getMonthlyIncomeRequest,
    }

  return (
    <OrderContext.Provider value={orderValue}>
        {children}
    </OrderContext.Provider>
  )
}
