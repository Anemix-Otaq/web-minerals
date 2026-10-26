// Carga y normalización de los datos de minerales.

import { CSV_URL, IMAGE_SEPARATOR } from "./config.js";
import { parseCSV } from "./csv.js";

function parseImages(rawImages, name) {
  if (!rawImages) return [];

  return rawImages.split(IMAGE_SEPARATOR).map((src) => ({
    src: src.trim(),
    alt: `Imagen de ${name}`,
  }));
}

/** Convierte una fila del CSV en un objeto mineral. */
function toMineral(row) {
  return {
    id: row.id,
    estante: row.estante,
    nroMuestra: row.nro_muestra,
    descripcion: row.descripcion,
    composicion: row.composicion,
    procedencia: row.procedencia,
    fecha: row.fecha,
    observacion: row.observacion,
    imagenes: parseImages(row.imagenes, row.nombre || row.descripcion),
  };
}

/** Descarga el CSV y devuelve la lista de minerales. */
export async function loadMinerals() {
  const response = await fetch(CSV_URL);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return parseCSV(await response.text()).map(toMineral);
}
