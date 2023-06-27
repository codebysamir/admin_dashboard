import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import ProductProvider from "./hooks/ProductContext"
import AuthProvider, { AuthContext } from "./hooks/AuthContext"
import { useContext, useEffect } from "react"
import Login from "./Pages/Login"


function App() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  // console.log(isLoggedIn)

  useEffect(() => {
    const controller = new AbortController()
    if (!isLoggedIn) navigate('/login')
    if (isLoggedIn && !user?.isAdmin) {
      logoutUser(controller)
    }

    return () => controller.abort()
  }, [isLoggedIn])

  return (
      <div className="bg-slate-50 dark:bg-slate-800 min-h-screen">
        <Topbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-60">
            <Outlet />
          </div>
        </div>
      </div>
  )
}

export default App
