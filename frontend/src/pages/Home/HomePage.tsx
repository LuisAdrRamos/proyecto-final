import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../../styles/index.css';

 // Assuming you have a CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <section className="hero">
        <h1>Bienvenido a Inventario App</h1>
        <p>Gestión eficiente, rápida y segura de tu inventario en la nube</p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/login')} className="btn btn-primary">Iniciar Sesión</button>
          <button onClick={() => navigate('/registro')} className="btn btn-secondary">Crear Cuenta</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🚀 Rápido y Seguro</h3>
          <p>Accede y gestiona tus productos de forma segura con autenticación protegida.</p>
        </div>
        <div className="feature-card">
          <h3>📦 CRUD de Productos</h3>
          <p>Registra, edita, elimina y consulta productos fácilmente desde un panel intuitivo.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Consulta en Tiempo Real</h3>
          <p>Verifica disponibilidad y stock de cada producto al instante.</p>
        </div>
      </section>
      <footer className="footer" style={{ textAlign: 'center', margin:  "100px", padding: '20px', backgroundColor: '#f1f1f128', borderRadius: '190px' }}>
        derechos reservadors &copy; 2025 Inventario App Josué Luis Guerra Ramos
      </footer>
    </div>
  );
};

export default HomePage;
