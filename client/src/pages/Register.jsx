import React from 'react'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Registro de Usuario</h1>
      <RegisterForm />
    </div>
  )
}
