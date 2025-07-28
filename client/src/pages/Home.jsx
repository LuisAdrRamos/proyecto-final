import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Sistema de Inventario</h1>
        <p className="text-gray-600 mb-8">
          Gestiona tus productos sin necesidad de login. ¡Explora, crea y edita!
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/productos" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Ir a Productos
          </Link>
          <Link to="/register" className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-100">
            Registrarme
          </Link>
        </div>
      </div>
    </section>
  )
}
