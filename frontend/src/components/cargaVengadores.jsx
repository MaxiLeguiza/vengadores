import React, { useState } from 'react';

const API_URL = 'http://localhost:3000/vengadores';

function CargaVengadores({ vengadores, setVengadores }) {
    const [nombre, setNombre] = useState('');
    const [alias, setAlias] = useState('');
    const [habilidades, setHabilidades] = useState([]);
    const [nuevaHabilidad, setNuevaHabilidad] = useState('');
    const [actor, setActor] = useState('');

    const agregarHabilidad = (e) => {
        e.preventDefault();
        if (nuevaHabilidad.trim() !== '') {
            setHabilidades([...habilidades, nuevaHabilidad.trim()]);
            setNuevaHabilidad('');
        }
    };

    const quitarHabilidad = (idx) => {
        setHabilidades(habilidades.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoVengador = { nombre, alias, habilidades, actor };
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoVengador)
        });
        if (res.ok) {
            const agregado = await res.json();
            setVengadores([...vengadores, agregado]);
            setNombre('');
            setAlias('');
            setHabilidades([]);
            setNuevaHabilidad('');
            setActor('');
        }
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: 400,
            margin: '0 auto'
        }}>
            <h2 style={{ textAlign: 'center' }}>Cargar Vengador</h2>
            <form onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                />
                <input
                    type="text"
                    placeholder="Alias"
                    value={alias}
                    onChange={e => setAlias(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                />
                {/* Habilidades */}
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input
                            type="text"
                            placeholder="Agregar habilidad"
                            value={nuevaHabilidad}
                            onChange={e => setNuevaHabilidad(e.target.value)}
                            style={{ flex: 1, padding: 8, boxSizing: 'border-box' }}
                        />
                        <button
                            onClick={agregarHabilidad}
                            type="button"
                            style={{ padding: 8, minWidth: 80 }}
                        >Agregar</button>
                    </div>
                    <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {habilidades.map((hab, idx) => (
                            <li key={idx} style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}>
                                <span style={{ flex: 1 }}>{hab}</span>
                                <button
                                    type="button"
                                    onClick={() => quitarHabilidad(idx)}
                                    style={{ marginLeft: 8, color: 'red', padding: '2px 8px' }}
                                >Quitar</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <input
                    type="text"
                    placeholder="Actor"
                    value={actor}
                    onChange={e => setActor(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                />
                <button type="submit" style={{ width: '100%', padding: 10 }}>Registrar</button>
            </form>
        </div>
    );
}

export default CargaVengadores;