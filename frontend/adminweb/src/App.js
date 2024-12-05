import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './routes/LogIn';
import MainPage from './routes/Main';
import CreateProductPage from './routes/CreateProduct';
import OrdersPage from './routes/Orders';
import OrderDetailPage from './routes/OrderDetail';
import React, { useState } from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/create-product",
    element: <CreateProductPage />
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/orders/:orderId",
    element: <OrderDetailPage />,
  }

]);

export const notifyBarContext = React.createContext()



function App() {
  const [showBar, setShowBar] = useState('')

  function showBarFunc(text) {
    setShowBar(text)
    setTimeout(() => setShowBar(''), 3000)
  }

  return <>
    <notifyBarContext.Provider value={[showBar, showBarFunc]}>
      <RouterProvider router={router}>
      </RouterProvider >
    </notifyBarContext.Provider>
  </>

}

export default App;
