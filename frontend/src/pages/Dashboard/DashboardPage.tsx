import Navbar from '../../components/layout/Navbar';
import '../../styles/index.css';


export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bienvenido al Panel de Inventario</h1>
        <p className="mt-2">Selecciona una opción del menú para continuar.</p>
      </div>
    </>
  );
}
