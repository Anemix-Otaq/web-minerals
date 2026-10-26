// Catálogo: minerales destacados, listado con búsqueda, paginación y contador.

import { FEATURED_COUNT, PAGE_SIZE } from "./config.js";
import {
  catalogCard,
  featuredCard,
  paginationControls,
} from "./templates.js";
import { $, getPageItems, pickRandom } from "./utils.js";

export function initCatalog() {
  const featuredGrid = $("#principalMineral");
  const catalogGrid = $("#catalogGrid");
  const pagination = $("#pagination");
  const sampleCount = $("#cantidadMuestras");
  const searchInput = $("#mineralSearch");
  const emptyState = $("#emptyState");

  let minerals = [];
  let currentPage = 1;

  function matchesQuery(m, query) {
    const searchable =
      `${m.estante} ${m.nroMuestra} ${m.descripcion} ${m.composicion} ${m.procedencia} ${m.fecha} ${m.observacion}`.toLocaleLowerCase(
        "es",
      );

    return searchable.includes(query);
  }

  function renderFeatured() {
    featuredGrid.innerHTML = pickRandom(minerals, FEATURED_COUNT)
      .map(featuredCard)
      .join("");
  }

  function renderPagination(totalPages) {
    const isVisible = totalPages > 1;
    pagination.classList.toggle("hidden", !isVisible);
    pagination.classList.toggle("flex", isVisible);
    pagination.innerHTML =
      isVisible
        ? paginationControls(
            getPageItems(currentPage, totalPages),
            currentPage,
            totalPages,
          )
        : "";
  }

  function renderCatalog() {
    const query = searchInput.value.trim().toLocaleLowerCase("es");
    const filtered = minerals.filter((m) => matchesQuery(m, query));

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, totalPages);

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    catalogGrid.innerHTML = pageItems.map(catalogCard).join("");
    emptyState.classList.toggle("hidden", filtered.length !== 0);
    sampleCount.textContent = minerals.length;
    renderPagination(totalPages);
  }

  // Al buscar se vuelve a la primera página.
  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderCatalog();
  });

  pagination.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;

    currentPage = Number(button.dataset.page);
    renderCatalog();
    catalogGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  return {
    /** Guarda la lista de minerales y dibuja las secciones que dependen de ella. */
    setMinerals(list) {
      minerals = list;
      currentPage = 1;
      renderFeatured();
      renderCatalog();
    },

    /** Muestra un mensaje de error en lugar del catálogo. */
    showError(message) {
      emptyState.textContent = message;
      emptyState.classList.remove("hidden");
    },
  };
}