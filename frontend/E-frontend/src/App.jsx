
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'  
import About from './pages/About'
import ReturnPolicy from './pages/ReturnPolicy'
import Disclaimer from './pages/Disclaimer'
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import EditProduct from './admin/EditProduct';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';
import AddProduct from './admin/AddProduct';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/return" element={<ReturnPolicy />} />
    <Route path="/disclaimer" element={<Disclaimer />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/order-success" element={<OrderSuccess />} />
    <Route path="/profile" element={<Profile />} />
    <Route path ="/shop" element={<Shop />} />

    // Admin routes
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/products" element={<AdminProducts />} />
    <Route path="/admin/orders" element={<AdminOrders />} />
    <Route path="/admin/users" element={<AdminUsers />} />
    <Route path="/admin/add-product" element={<AddProduct />} />
    <Route path="/admin/edit-product/:id" element={<EditProduct />} />
  </Routes>
  <Footer />

    
    </>
  )
}

export default App
