import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { actualizarProducto, listarProductos } from '../../api/productos.api';
import toast from 'react-hot-toast';
import '../../styles/index.css';


export default function ProductoEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    listarProductos().then((productos) => {
      const producto = productos.find(p => p.id === Number(id));
      if (producto) setForm(producto);
      else toast.error("Producto no encontrado");
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await actualizarProducto(Number(id), form);
      toast.success("Producto actualizado");
      navigate('/productos');
    } catch {
      toast.error("Error al actualizar");
    }
  };

  if (!form) return <p className="p-6">Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Editar Producto</h1>
      {["codigo", "nombre", "descripcion", "unidad", "categoria"].map((f) => (
        <input
          key={f}
          placeholder={f}
          className="block border p-2 w-full mb-3"
          value={form[f]}
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
      <button className="bg-green-600 text-white px-4 py-2 rounded">Actualizar</button>
    </form>
  );
}
