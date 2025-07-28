import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'
import EditProduct from './pages/EditProduct'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 max-w-7xl w-full mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/nuevo" element={<NewProduct />} />
          <Route path="/productos/:id/editar" element={<EditProduct />} />
        </Routes>
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Inventario
      </footer>
    </div>
  )
}
