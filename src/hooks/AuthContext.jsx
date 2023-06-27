import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'
import useFetch from './useFetch'

const LOCAL = import.meta.env.VITE_LOCAL

export const AuthContext = createContext({
  loginUser: () => {},
  registerUser: () => {},
  loginError: String,
  loading: Boolean,
  isLoggedIn: Boolean,
  setIsLoggedIn: () => {},
  user: Object,
  setUser: () => {},
  accessToken: String,
  setAccessToken: () => {},
  isSuccess: Boolean,
  logoutUser: () => {}
})

export default function AuthProvider({children}) {
  const [accessToken, setAccessToken] = useState()
  const [loginError, setLoginError] = useState()
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)
  const [user, setUser] = useLocalStorage('user', '')
  const navigate = useNavigate()
  const location = useLocation()
  const fetchInceptor = useFetch()

    const loginUser = async (user) => {
      setLoading(true)
      setLoginError()

      try {
        const loginRequest = await fetch(LOCAL + '/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
        const response = await loginRequest.json()
        console.log(response)
        if (response.status === 'failed') {
          setLoginError(response?.msg)
        } else {
          if (!response.isAdmin) return setLoginError('Only Admin User can login')
          setAccessToken(response?.accessToken)
          setIsLoggedIn(true)
          setUser({
            userId: response._id,
            email: response.email,
            username: response.username,
            img: response?.img ?? null,
            createdAt: response.createdAt,
            isAdmin: response.isAdmin
          })
          console.log(location)
          navigate(-1, {replace: true})
        }
      } catch (err) {
        console.log('ERROR User Login failed: ', err)
      } finally {
        setLoading(false)
      }
    }

    const registerUser = async (user) => {
      setLoading(true)

      try {
        const registerRequest = await fetch(LOCAL + '/api/auth/register' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        const response = await registerRequest.json()
        console.log(response)
        
        if (response.status === 'failed') {
          setLoginError(response?.user)
          console.log('register failed: ' + response.status)
        } else if (response.status === 'error') {
          setLoginError(response?.err.message)
          console.log('register error: ' + response.status)
        } else {
          setLoginError(null)
          // setUser({
          //   userId: response.user._id,
          //   email: response.user.email,
          //   username: response.user.username,
          //   createdAt: response.user.createdAt,
          //   isAdmin: response.user.isAdmin
          // })
          setIsSuccess(true)
        }
      } catch (err) {
        console.log('ERROR Register New User failed: ', err)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      isSuccess && setTimeout(() => {
        setIsSuccess(false)
        navigate(-1)
      }, 2000);
    }, [isSuccess])
    

    const logoutUser = async (controller) => {
      setLoading(true)

      try {
        const requestLogout = await fetchInceptor(LOCAL + '/api/auth/logout/' + user.userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer ' + accessToken
          },
          logoutData: {
            userId: user.userId,
            accessToken
          },
          signal: controller.signal
        })
        const response = await requestLogout.json()
        console.log(response)
        if (!requestLogout.ok) return new Error(response)
        setIsLoggedIn(false)
        setUser('')
        // setIsSuccess(true)
        setAccessToken()
      } catch (err) {
        console.log('ERROR Logout User failed: ', err)
        if (err.status === 'expired') navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    const authValue = {
        loginUser,
        registerUser,
        loginError,
        loading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        accessToken,
        setAccessToken,
        isSuccess,
        logoutUser
    }

  return (
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}
