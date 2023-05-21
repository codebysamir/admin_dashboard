import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"


function App() {

  return (
    <div className="bg-slate-800">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-slate-50 ml-60">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
