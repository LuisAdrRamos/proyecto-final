import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const linkBase = "px-3 py-2 rounded hover:bg-blue-100"
  const activeClass = ({ isActive }) =>
    isActive ? `${linkBase} font-bold text-blue-600` : linkBase

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link to="/" className="font-bold text-lg">Inventario</Link>
          <div className="flex gap-2">
            <NavLink to="/" className={activeClass}>Inicio</NavLink>
            <NavLink to="/productos" className={activeClass}>Productos</NavLink>
            <NavLink to="/register" className={activeClass}>Registro</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
