import React, { useState } from 'react'
import api from '../core/api'

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [msg, setMsg] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg(null)
    try {
      const { data } = await api.post('/usuarios', form)
      setMsg(data.message || 'Usuario registrado con éxito')
      setForm({ username: '', email: '', password: '' })
    } catch (error) {
      setMsg(error.response?.data?.error || 'Error al registrar')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Usuario"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
        className="w-full p-2 border rounded"
        required
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">
        Registrarme
      </button>
      {msg && <p className="text-center text-sm text-gray-600">{msg}</p>}
    </form>
  )
}
