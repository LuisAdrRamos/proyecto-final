import React from 'react'
import { useParams } from 'react-router-dom'
import ProductForm from '../products/ProductForm'

export default function EditProduct() {
  const { id } = useParams()
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Editar producto #{id}</h1>
      <ProductForm id={id} />
    </div>
  )
}
