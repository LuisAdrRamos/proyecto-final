import { useState } from 'react';
import { registrarProducto } from '../../api/productos.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/index.css';


export default function ProductoCreatePage() {
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    unidad: '',
    categoria: '',
    stock: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrarProducto(form);
      toast.success("Producto registrado");
      navigate('/productos');
    } catch {
      toast.error("Error al registrar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Registrar Producto</h1>
      {["codigo", "nombre", "descripcion", "unidad", "categoria"].map((f) => (
        <input
          key={f}
          placeholder={f}
          className="block border p-2 w-full mb-3"
          value={form[f as keyof typeof form]}
          onChange={e => setForm({ ...form, [f]: e.target.value })}
        />
      ))}
      <input
        type="number"
        placeholder="stock"
        className="block border p-2 w-full mb-3"
        value={form.stock}
        onChange={e => setForm({ ...form, stock: +e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
}
