import { useState, useEffect } from 'react'
import './CSS/App.css'
import CargaVengadores from './components/cargaVengadores'
import ListaVengadores from './components/ListaVengadores'
import EditarVengador from './components/EditarVengador'

const API_URL = 'http://localhost:3000/vengadores';

function App() {
  const [vengadores, setVengadores] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // Cargar el listado al montar la app
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setVengadores(data));
  }, []);

  // Eliminar uno o varios vengadores
  const handleEliminar = async (ids) => {
    for (const id of ids) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    }
    setVengadores(vengadores.filter(v => !ids.includes(v.id)));
  };

  // Seleccionar para editar
  const handleEditar = (id) => {
    setEditandoId(id);
  };

  // Guardar cambios de edición
  const handleGuardarEdicion = async (vengadorEditado) => {
    const res = await fetch(`${API_URL}/${vengadorEditado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vengadorEditado)
    });
    if (res.ok) {
      const actualizado = await res.json();
      setVengadores(vengadores.map(v => v.id === actualizado.id ? actualizado : v));
      setEditandoId(null);
    }
  };

  // Cancelar edición
  const handleCancelarEdicion = () => {
    setEditandoId(null);
  };

  const vengadorAEditar = vengadores.find(v => v.id === editandoId);

  return (
    <div className='columnas'>
      <CargaVengadores vengadores={vengadores} setVengadores={setVengadores} />
      <ListaVengadores
        vengadores={vengadores}
        onEliminar={handleEliminar}
        onEditar={handleEditar}
      />
      {editandoId && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <EditarVengador
            vengador={vengadorAEditar}
            onGuardar={handleGuardarEdicion}
            onCancelar={handleCancelarEdicion}
          />
        </div>
      )}
    </div>
  )
}

export default App