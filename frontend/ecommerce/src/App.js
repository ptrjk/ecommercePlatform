import './App.css';
import './NavBar.css'
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/Home';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import React, { useState } from 'react';
import TestPage from './pages/test';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "products/:category",
    element: <ProductsPage />,
  },
  {
    path: "test",
    element: <TestPage />,
  },
]);

export const ProductsContext = React.createContext();
export const CartContext = React.createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  return <CartContext.Provider value={[cart, setCart]}>
    <ProductsContext.Provider value={[products, setProducts]}>
      <RouterProvider router={router} />
    </ProductsContext.Provider>
  </CartContext.Provider>
}

export default App;
