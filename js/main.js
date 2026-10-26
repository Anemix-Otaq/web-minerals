// Punto de entrada: conecta los módulos de la página.

import { CSV_FILE } from "./config.js";
import { initCatalog } from "./catalog.js";
import { loadMinerals } from "./data.js";
import { initModal } from "./modal.js";
import { initNavigation } from "./navigation.js";
import { initSlider } from "./slider.js";
import { $ } from "./utils.js";

const catalog = initCatalog();
const modal = initModal();
let minerals = [];

initSlider();
initNavigation();
$("#year").textContent = new Date().getFullYear();

// Cualquier botón "Ver detalles / Consultar ficha" abre el modal.
document.addEventListener("click", (event) => {
  const button = event.target.closest(".detail-btn");
  if (!button) return;

  const mineral = minerals.find((item) => item.id === button.dataset.mineral);
  if (mineral) modal.open(mineral);
});

async function loadCatalog() {
  try {
    minerals = await loadMinerals();
    catalog.setMinerals(minerals);
  } catch (error) {
    console.error("No se pudieron cargar los minerales:", error);
    catalog.showError(
      `No se pudo cargar el catálogo. Verifica el archivo ${CSV_FILE}.`,
    );
  }
}

loadCatalog();
