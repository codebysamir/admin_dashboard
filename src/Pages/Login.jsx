import React, { useContext, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext'
import { Link } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'

export default function Login() {
  const [user, setUser] = useState({username: '', password: ''})
  const { loginUser, loginError, loading } = useContext(AuthContext)

  console.log(loading)
  console.log(loginError)

    function handleLogin(e) {
      e.preventDefault()
      console.log(user)
      loginUser(user)
      setUser({username: '', password: ''})
    }
      
  return (
    <div className='grid place-content-center place-items-center h-screen bg-cover bg-[url("/src/assets/login_bg.jpeg")]'>
        <form className="bg-slate-50 p-16 flex flex-col gap-6 rounded-lg dark:bg-slate-800" method="post" onSubmit={(e) => handleLogin(e)}>
          <h2 className='font-bold text-3xl text-blue-500'>SIGN IN</h2>
          {loginError && <span className='border-2 border-red-600 p-2 font-semibold'>{loginError?.message ?? loginError}</span>}
          <input className='outline-none p-2 border-b-2 bg-transparent focus:border-blue-400 dark:text-slate-300' type="text" placeholder='username' value={user?.username} onChange={(e) => setUser({...user, username: e.target.value})} />
          <input className='outline-none p-2 border-b-2 bg-transparent focus:border-blue-400 dark:text-slate-300' type="password" placeholder='password' value={user?.password} onChange={(e) => setUser({...user, password: e.target.value})} />
          {loading ? <MoonLoader className='mx-auto' size={40} /> :
            <button type='submit' className="rounded-md p-2 border-transparent text-white cursor-pointer bg-blue-500 hover:bg-blue-800 disabled:opacity-25 disabled:cursor-default disabled:hover:bg-blue-500" disabled={user.username === '' || user.password === ''} >LOGIN</button>}
          {/* <Link>
            <button className="underline cursor-pointer">I FORGOT MY PASSWORD</button>
          </Link>
          <Link to={'/register'}>
            <button className="underline cursor-pointer">CREATE A NEW ACCOUNT</button>
          </Link> */}
        </form>
    </div>
  )
}
