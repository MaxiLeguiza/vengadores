import React, { useState } from 'react';

function ListaVengadores({ vengadores, onEliminar, onEditar }) {
  const [seleccionados, setSeleccionados] = useState([]);

  const handleCheckbox = (id) => {
    setSeleccionados(prev =>
      prev.includes(id)
        ? prev.filter(sid => sid !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <h3>Listado de vengadores</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {vengadores.map((v) => (
          <li key={v.id} style={{ marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={seleccionados.includes(v.id)}
              onChange={() => handleCheckbox(v.id)}
              style={{ marginRight: 8 }}
            />
            <strong>{v.nombre}</strong> - {v.alias} - {v.actor}
            <br />
            <span style={{ fontSize: '0.95em', color: '#555' }}>
              Habilidades: {v.habilidades && v.habilidades.length > 0
                ? v.habilidades.map(h => h.nombre).join(', ')
                : 'Sin habilidades'}
            </span>
          </li>
        ))}
      </ul>
      <button
        disabled={seleccionados.length === 0}
        onClick={() => onEliminar(seleccionados)}
        style={{ marginRight: 8 }}
      >
        Eliminar seleccionados
      </button>
      <button
        disabled={seleccionados.length !== 1}
        onClick={() => onEditar(seleccionados[0])}
      >
        Editar seleccionado
      </button>
    </div>
  );
}

export default ListaVengadores;