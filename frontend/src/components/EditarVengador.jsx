import React, { useState, useEffect } from 'react';

function EditarVengador({ vengador, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState('');
  const [alias, setAlias] = useState('');
  const [habilidades, setHabilidades] = useState('');
  const [actor, setActor] = useState('');

  useEffect(() => {
    if (vengador) {
      setNombre(vengador.nombre);
      setAlias(vengador.alias);
      setHabilidades(vengador.habilidades);
      setActor(vengador.actor);
    }
  }, [vengador]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({
      ...vengador,
      nombre,
      alias,
      habilidades,
      actor
    });
  };

  if (!vengador) return null;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #ccc',
      padding: 20,
      borderRadius: 8,
      maxWidth: 350,
      margin: '0 auto'
    }}>
      <h3>Editar Vengador</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <input
          type="text"
          placeholder="Alias"
          value={alias}
          onChange={e => setAlias(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <input
          type="text"
          placeholder="Habilidades"
          value={habilidades}
          onChange={e => setHabilidades(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <input
          type="text"
          placeholder="Actor"
          value={actor}
          onChange={e => setActor(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <button type="submit" style={{ marginRight: 8 }}>Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditarVengador;