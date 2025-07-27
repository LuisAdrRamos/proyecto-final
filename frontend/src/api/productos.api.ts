import axios from './axios';
import { Producto } from '../types/producto';

export async function listarProductos(): Promise<Producto[]> {
  const { data } = await axios.get('/productos');
  return data;
}

export async function registrarProducto(producto: Producto) {
  return axios.post('/productos/registrar', producto);
}

export async function actualizarProducto(id: number, producto: Producto) {
  return axios.put(`/productos/actualizar/${id}`, producto);
}

export async function consultarDisponibilidad(codigo: string) {
  const { data } = await axios.get(`/productos/disponibilidad/${codigo}`);
  return data;
}
