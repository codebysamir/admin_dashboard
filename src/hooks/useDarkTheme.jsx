import React, { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'

export default function useDarkTheme() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    console.log(theme)
    if (theme === 'dark' || ((theme === 'os') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
  }, [theme])
  
  return [theme, setTheme]
}
