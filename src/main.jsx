import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from './Pages/Users.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import Home from './Pages/Home.jsx';
import EditUser from './Pages/EditUser.jsx';
import CreateUser from './Pages/CreateUser.jsx';
import Products from './Pages/Products.jsx';
import EditProduct from './Pages/EditProduct.jsx';
import CreateProduct from './Pages/CreateProduct.jsx';
import Product from './Pages/Product.jsx';
import User from './Pages/User.jsx';
import Login from './Pages/Login.jsx';
import Root from './Root.jsx';
import AuthProvider from './hooks/AuthContext.jsx';
import Orders from './Pages/Orders.jsx';
import CreateOrder from './Pages/CreateOrder.jsx';
import Order from './Pages/Order.jsx';
import EditOrder from './Pages/EditOrder.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/user/:id",
        element: <User />,
      },
      {
        path: "/edit-user/:id",
        element: <EditUser />,
      },
      {
        path: "/create-user",
        element: <CreateUser />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/create-order",
        element: <CreateOrder />,
      },
      {
        path: "/order/:id",
        element: <Order />,
      },
      {
        path: "/edit-order/:id",
        element: <EditOrder />,
      },
    ]
  },
  {
    path: "/login",
    element: (
    <AuthProvider>
      <Login />
    </AuthProvider>
    ),
    // errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
