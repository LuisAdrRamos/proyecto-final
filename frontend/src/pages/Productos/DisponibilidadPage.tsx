import { useState } from 'react';
import { consultarDisponibilidad } from '../../api/productos.api';
import toast from 'react-hot-toast';
import '../../styles/index.css';


export default function DisponibilidadPage() {
  const [codigo, setCodigo] = useState('');
  const [info, setInfo] = useState<any>(null);

  const handleConsultar = async () => {
    try {
      const data = await consultarDisponibilidad(codigo);
      setInfo(data);
    } catch {
      toast.error("Producto no encontrado");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Consultar disponibilidad</h1>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Código del producto"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConsultar}>
        Consultar
      </button>
      {info && (
        <div className="mt-4 border p-4 rounded bg-white shadow">
          <p><strong>Nombre:</strong> {info.nombre}</p>
          <p><strong>Stock:</strong> {info.stock}</p>
          <p><strong>Disponible:</strong> {info.disponible ? 'Sí' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
