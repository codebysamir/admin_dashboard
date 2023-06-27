import { DarkModeOutlined, LanguageOutlined, LightModeOutlined, NotificationAddTwoTone, Settings, SettingsBrightnessOutlined } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext'
import { Menu, MenuItem } from '@mui/material'
import useDarkTheme from '../hooks/useDarkTheme'
import { Link } from 'react-router-dom'

export default function Topbar() {
  const { user, logoutUser } = useContext(AuthContext)
  const [openProfileModal, setOpenProfileModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [theme, setTheme] = useDarkTheme()

  const handleLogout = () => {
    const controller = new AbortController()
    logoutUser(controller)
    setOpenProfileModal(false)
    setAnchorEl(null)
  }

  const handleOpenProfile = (e) => {
    setOpenProfileModal(true)
    setAnchorEl(e.target)
  }

  const handleTheme = () => {
    if (theme === 'light') {
        setTheme('dark')
    } else if (theme === 'dark') {
        setTheme('os')
    } else if (theme === 'os') {
        setTheme('light')
    }
  }

  return (
    <div className='flex justify-between p-6 sticky top-0 bg-white z-50 dark:bg-slate-900 dark:text-slate-300'>
        <div>
            <Link to={'/'}>
                <h1 className='font-bold text-3xl text-blue-800 dark:text-blue-500'>Admin Dashboard</h1>
            </Link>
        </div>
        <div className="flex items-center gap-3" title='Theme'>
            <div className='flex items-center cursor-pointer' onClick={handleTheme}>
                {theme === 'light' ?
                    <LightModeOutlined />
                    :
                    theme === 'dark' ?
                    <DarkModeOutlined />
                    :
                    theme === 'os' &&
                    <SettingsBrightnessOutlined />
                }
            </div>
            <div className='flex items-center cursor-pointer'>
                <NotificationAddTwoTone />
                <span className="inline-flex place-content-center place-items-center bg-red-700 rounded-full w-5 h-5 abolute mb-4 -ml-4">
                    <span className='relative text-white'>2</span>
                </span>
            </div>
            <div className='flex items-center cursor-pointer'>
                <LanguageOutlined />
                <span className="inline-flex place-content-center place-items-center bg-red-700 rounded-full w-5 h-5 abolute mb-4 -ml-4">
                    <span className='relative text-white'>2</span>
                </span>
            </div>
            <div className='flex items-center cursor-pointer'>
                <Settings />
            </div>
            <div>
                <img src={user?.img ?? '/src/assets/user.png'} className='w-12 h-12 object-cover rounded-full cursor-pointer' onClick={(e) => handleOpenProfile(e)} />
                {openProfileModal && 
                <Menu 
                open 
                anchorEl={anchorEl}
                onClose={() => setOpenProfileModal(false)} 
                children={<MenuItem onClick={handleLogout}>Logout</MenuItem>} 
                />}
            </div>
        </div>
    </div>
  )
}
