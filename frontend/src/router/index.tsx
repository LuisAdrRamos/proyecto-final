import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../auth/components/ProtectedRoute';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import PerfilPage from '../pages/Perfil/PerfilPage';
import ProductosListPage from '../pages/Productos/ProductosListPage';
import ProductoCreatePage from '../pages/Productos/ProductoCreatePage';
import ProductoEditPage from '../pages/Productos/ProductoEditPage';
import DisponibilidadPage from '../pages/Productos/DisponibilidadPage';
import HomePage from '../pages/Home/HomePage';
import RegistroPage from '../pages/Registro/RegistroPage';
import '../styles/index.css';



export const router = createBrowserRouter([
  // Rutas públicas
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/registro', element: <RegistroPage /> },
  // Rutas protegidas
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/perfil', element: <PerfilPage /> },
      { path: '/productos', element: <ProductosListPage /> },
      { path: '/productos/nuevo', element: <ProductoCreatePage /> },
      { path: '/productos/editar/:id', element: <ProductoEditPage /> },
      { path: '/productos/disponibilidad', element: <DisponibilidadPage /> },
    ],
  },
]);
