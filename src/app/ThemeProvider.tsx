'use client'

import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState({
    colorPrimary: '#00C67A',
    colorError: '#f44336',
    colorWarning: '#ffd500',
    colorSuccess: '#00C67A',
  })

  useEffect(() => {
    const getVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim()

    setToken({
      colorPrimary: getVar('--color-primary'),
      colorError: getVar('--color-error'),
      colorWarning: getVar('--color-warning'),
      colorSuccess: getVar('--color-success'),
    })
  }, [])

  return <ConfigProvider theme={{ token }}>{children}</ConfigProvider>
}
