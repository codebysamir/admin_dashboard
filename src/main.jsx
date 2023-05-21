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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/edit-user",
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
        path: "/edit-product",
        element: <EditProduct />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
