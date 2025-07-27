import { useQuery } from '@tanstack/react-query';
import { listarProductos } from '../../api/productos.api';
import { Producto } from '../../types/producto';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import '../../styles/index.css';


export default function ProductosListPage() {
  const { data, isLoading } = useQuery<Producto[]>({
    queryKey: ['productos'],
    queryFn: listarProductos,
  });

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>
        <Link to="/productos/nuevo" className="bg-green-600 text-white px-3 py-2 rounded">
          + Nuevo Producto
        </Link>
        {isLoading ? (
          <p className="mt-4">Cargando productos...</p>
        ) : (
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Código</th>
                <th className="border px-2 py-1">Nombre</th>
                <th className="border px-2 py-1">Stock</th>
                <th className="border px-2 py-1">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((producto) => (
                <tr key={producto.id}>
                  <td className="border px-2 py-1">{producto.codigo}</td>
                  <td className="border px-2 py-1">{producto.nombre}</td>
                  <td className="border px-2 py-1">{producto.stock}</td>
                  <td className="border px-2 py-1">
                    <Link
                      to={`/productos/editar/${producto.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
