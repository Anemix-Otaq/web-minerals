// Modal con la ficha mineralógica y su galería de imágenes.

import { modalBody } from "./templates.js";
import { $ } from "./utils.js";

/** Activa los botones anterior / siguiente de la galería (si hay 2+ imágenes). */
function initGallery(images) {
  if (images.length < 2) return;

  const image = $("#sliderImage");
  const counter = $("#sliderCounter");
  let current = 0;

  function show(index) {
    current = (index + images.length) % images.length;

    image.src = images[current].src;
    image.alt = `Muestra mineral, imagen ${current + 1}`;
    counter.textContent = `${current + 1} / ${images.length}`;
  }

  $("#prevImage").addEventListener("click", () => show(current - 1));
  $("#nextImage").addEventListener("click", () => show(current + 1));
}

export function initModal() {
  const modal = $("#mineralModal");
  const title = $("#modalTitle");
  const content = $("#modalContent");
  const closeButton = $("#closeModal");

  function open(mineral) {
    title.textContent = mineral.descripcion;
    content.innerHTML = modalBody(mineral);
    initGallery(mineral.imagenes);

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function close() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  closeButton.addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  return { open, close };
}
