import { Router } from "express";
import {
  obtenerVengadores,
  crearVengador,
  actualizarVengador,
  eliminarVengador,
} from "../controllers/vengadores.controller.js";

const router = Router();

router.get("/", obtenerVengadores);
router.post("/", crearVengador);
router.put("/:id", actualizarVengador);
router.delete("/:id", eliminarVengador);

export default router;
