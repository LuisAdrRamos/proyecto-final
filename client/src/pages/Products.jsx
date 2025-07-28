import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../core/api'

export default function Products() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productos'],
    queryFn: async () => {
      const res = await api.get('/productos') // GET /productos
      return res.data
    }
  })

  if (isLoading) return <p>Cargando productos...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link
          to="/productos/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Nuevo
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2">{p.stock}</td>
                <td className="px-4 py-2">${p.precio}</td>
                <td className="px-4 py-2 text-right">
                  <Link
                    to={`/productos/${p.id}/editar`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  {/* Si tu backend soporta DELETE /productos/:id puedes añadir aquí un botón Eliminar */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
