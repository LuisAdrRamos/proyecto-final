import React from 'react'
import ProductForm from '../products/ProductForm'

export default function NewProduct() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Crear producto</h1>
      <ProductForm />
    </div>
  )
}
