import { prisma } from '../prisma/client.js';

export const obtenerVengadores = async (req, res) => {
  try {
    const vengadores = await prisma.vengador.findMany({
      include: { habilidades: true }
    });
    res.json(vengadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vengadores' });
  }
}

export const crearVengador = async (req, res) => {
  const { nombre, alias, actor, habilidades } = req.body;

  try {
    const nuevoVengador = await prisma.vengador.create({
      data: {
        nombre,
        alias,
        actor,
        habilidades: {
          create: habilidades.map((habilidad) => ({ nombre: habilidad })),
        },
      },
    });
    res.status(201).json(nuevoVengador);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el vengador' });
  }
}

export const actualizarVengador = async (req, res) => {
  const { id } = req.params;
  const { nombre, alias, actor, habilidades } = req.body;

  try {
    // Elimina habilidades anteriores
    await prisma.habilidad.deleteMany({
      where: { vengadorId: Number(id) }
    });

    // Actualiza el vengador y agrega nuevas habilidades
    const vengadorActualizado = await prisma.vengador.update({
      where: { id: Number(id) },
      data: {
        nombre,
        alias,
        actor,
        habilidades: {
          create: habilidades.map((habilidad) => ({ nombre: habilidad })),
        },
      },
      include: { habilidades: true }
    });
    res.json(vengadorActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el vengador' });
  }
}

export const eliminarVengador = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.vengador.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el vengador' });
  }
}
