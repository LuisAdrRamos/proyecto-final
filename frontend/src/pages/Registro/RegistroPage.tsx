import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../../api/axios';
import Navbar from '../../components/layout/Navbar';
import '../../styles/index.css';


export default function RegistroPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/usuarios/registrar', form);
      toast.success("Usuario creado. Ahora inicia sesión.");
      navigate('/login');
    } catch (e) {
      toast.error("Error al crear usuario");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Usuario"
            className="w-full p-2 border mb-3 rounded"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border mb-4 rounded"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
}
