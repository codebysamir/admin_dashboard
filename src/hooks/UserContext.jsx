import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from './useFetch'
import { AuthContext } from './AuthContext'

const LOCAL = import.meta.env.VITE_LOCAL

export const UserContext = createContext({
    loading: Boolean,
    error: String,
    users: [],
    newestUsers: [],
    user: {},
    stats: [],
    setUsers: () => {},
    getAllUsersRequest: () => {},
    getUserRequest: () => {},
    createUserRequest: () => {},
    updateUserRequest: () => {},
    deleteUserRequest: () => {},
    getUserStatsRequest: () => {},
})

export default function UserProvider({children}) {
    const { accessToken } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [newestUsers, setNewestUsers] = useState([])
    const [user, setUser] = useState()
    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()
    const fetchInceptor = useFetch()

    const getAllUsersRequest = async (controller, params) => {
        console.log(params)
        setLoading(true)
        setError()
        try {
            const request = await fetchInceptor(!params ? LOCAL + '/api/users' : LOCAL + '/api/users?' + params, {
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
            if (params) {
                console.log(params)
                console.log('newest' , response)
                return setNewestUsers(response)
            }
            setUsers(response)
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('user request failed, error: ' + err)
            } else {
                console.log('user request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const getUserRequest = async (controller, id) => {
        setLoading(true)
        setError()
        try {
            const request = await fetchInceptor(LOCAL + `/api/users/find/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: 'Bearer ' + accessToken,
            },
            signal: controller.signal
            })
            const response = await request.json()
            console.log(response)
            setUser(response)
            return response
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('user request failed, error: ' + err)
            } else {
                console.log('user request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const createUserRequest = async (controller, user) => {
        setLoading(true)
        setError()

        // const formData = new FormData()
        // Object.entries(user).forEach(([key, value]) => formData.append(key, value))
        // console.log(formData)

        try {
            const request = await fetchInceptor(LOCAL + '/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken,
                },
                signal: controller.signal,
                body: JSON.stringify(user)
            })
            const response = await request.json()
            console.log(response)
            if (!request.ok) {
                setError(response)
                return
            } else {
                setUsers(prevUsers => [...prevUsers, response.user])
                navigate(-1)
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('user request failed, error: ' + err)
            } else {
                console.log('user request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    const updateUserRequest = async (controller, user, id) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/users/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken,
                },
                signal: controller.signal,
                body: JSON.stringify(user)
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
                console.log('user request failed, error: ' + err)
            } else {
                console.log('user request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }


    const deleteUserRequest = async (controller, id) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/users/' + id, {
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
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id))
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('user request failed, error: ' + err)
            } else {
                console.log('user request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }
    
    const getUserStatsRequest = async (controller) => {
        setLoading(true)
        setError()

        try {
            const request = await fetchInceptor(LOCAL + '/api/users/stats', {
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
                const sortedResponse = response.toSorted((a, b) => a._id - b._id)
                setStats(sortedResponse)
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('user request failed, error: ' + err)
            } else {
                console.log('user request failed, error: ' + err)
                setError(err)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        getAllUsersRequest(controller)
        return () => controller.abort()
      }, [])

    const userValue = {
        error,
        loading,
        newestUsers,
        users,
        user,
        stats,
        setUsers,
        getAllUsersRequest,
        getUserRequest,
        createUserRequest,
        updateUserRequest,
        deleteUserRequest,
        getUserStatsRequest
    }

  return (
    <UserContext.Provider value={userValue}>
        {children}
    </UserContext.Provider>
  )
}
