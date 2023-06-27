import React from 'react'
import App from './App'
import ProductProvider from './hooks/ProductContext'
import AuthProvider from './hooks/AuthContext'
import UserProvider from './hooks/UserContext'
import OrderProvider from './hooks/OrderContext'

export default function Root() {
  return (
    <>
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <OrderProvider>
              <App/>
          </OrderProvider>
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
    </>
  )
}
