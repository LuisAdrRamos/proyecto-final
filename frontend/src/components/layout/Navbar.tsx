import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { useDisclosure } from '../../hooks/useDisclosure';
import '../../styles/index.css';


export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const menu = useDisclosure();

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-700">
        <Link to="/">InventarioApp</Link>
      </div>

      <div className="relative">
        <button onClick={menu.toggle} className="text-blue-700 font-medium hover:underline">
          ☰
        </button>
        {menu.isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
            {!token ? (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Iniciar sesión</Link>
                <Link to="/registro" className="block px-4 py-2 hover:bg-gray-100">Crear cuenta</Link>
              </>
            ) : (
              <>
                <Link to="/perfil" className="block px-4 py-2 hover:bg-gray-100">Mi perfil</Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
