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
      // Convierte array de objetos a string separado por coma
      setHabilidades(
        Array.isArray(vengador.habilidades)
          ? vengador.habilidades.map(h => h.nombre).join(', ')
          : ''
      );
      setActor(vengador.actor);
    }
  }, [vengador]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convierte el string de habilidades a array de strings
    const habilidadesArray = habilidades
      .split(',')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    onGuardar({
      ...vengador,
      nombre,
      alias,
      habilidades: habilidadesArray,
      actor
    });
  };

  if (!vengador) return null;

  return (
    <div style={{
      background: '#111',
      border: '2px solid #222',
      color: '#fff',
      padding: 24,
      borderRadius: 10,
      maxWidth: 400,
      margin: '0 auto',
      boxShadow: '0 0 24px #000'
    }}>
      <h3 style={{ color: '#fff', textAlign: 'center' }}>Editar Vengador</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          style={{
            display: 'block',
            marginBottom: 12,
            width: '100%',
            background: '#222',
            color: '#fff',
            border: '1px solid #444',
            padding: 8,
            borderRadius: 4
          }}
        />
        <input
          type="text"
          placeholder="Alias"
          value={alias}
          onChange={e => setAlias(e.target.value)}
          required
          style={{
            display: 'block',
            marginBottom: 12,
            width: '100%',
            background: '#222',
            color: '#fff',
            border: '1px solid #444',
            padding: 8,
            borderRadius: 4
          }}
        />
        <input
          type="text"
          placeholder="Habilidades (separadas por coma)"
          value={habilidades}
          onChange={e => setHabilidades(e.target.value)}
          required
          style={{
            display: 'block',
            marginBottom: 12,
            width: '100%',
            background: '#222',
            color: '#fff',
            border: '1px solid #444',
            padding: 8,
            borderRadius: 4
          }}
        />
        <input
          type="text"
          placeholder="Actor"
          value={actor}
          onChange={e => setActor(e.target.value)}
          required
          style={{
            display: 'block',
            marginBottom: 16,
            width: '100%',
            background: '#222',
            color: '#fff',
            border: '1px solid #444',
            padding: 8,
            borderRadius: 4
          }}
        />
        <button type="submit" style={{
          marginRight: 8,
          background: '#0d6efd',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 4,
          cursor: 'pointer'
        }}>Guardar</button>
        <button type="button" onClick={onCancelar} style={{
          background: '#444',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 4,
          cursor: 'pointer'
        }}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditarVengador;