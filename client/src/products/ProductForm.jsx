import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../core/api'

export default function ProductForm({ id }) {
  const isEdit = Boolean(id)
  const qc = useQueryClient()

  const [form, setForm] = useState({ nombre: '', stock: 0, precio: 0 })

  // Cargar producto si es edición
  const { data: producto } = useQuery({
    queryKey: ['producto', id],
    queryFn: async () => {
      const { data } = await api.get(`/productos/${id}`) // GET /productos/<id>
      return data
    },
    enabled: isEdit
  })

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre,
        stock: producto.stock,
        precio: producto.precio
      })
    }
  }, [producto])

  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (isEdit) {
        // PUT /productos/<id>
        return await api.put(`/productos/${id}`, payload)
      }
      // POST /productos
      return await api.post('/productos', payload)
    },
    onSuccess: () => {
      qc.invalidateQueries(['productos'])
      alert('Guardado correctamente')
    },
    onError: (e) => {
      alert(e.response?.data?.error || 'Error al guardar')
    }
  })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        placeholder="Nombre"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={onChange}
        placeholder="Stock"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        step="0.01"
        name="precio"
        value={form.precio}
        onChange={onChange}
        placeholder="Precio"
        className="w-full p-2 border rounded"
        required
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="submit"
      >
        {isEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  )
}

