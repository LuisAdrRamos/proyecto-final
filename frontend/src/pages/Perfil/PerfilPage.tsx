import Navbar from '../../components/layout/Navbar';
import '../../styles/index.css';

export default function PerfilPage() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold">Mi Perfil</h1>
        <p className="mt-2">Aquí podrás ver o editar tu información personal próximamente.</p>
      </div>
    </>
  );
}
