// Plantillas HTML (strings) para tarjetas y ficha del mineral.

const CARD_CLASSES =
  "mineral-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl";

/** Tarjeta de "Minerales destacados". */
export function featuredCard(m) {
  const image = m.imagenes[0];

  return `
    <article class="${CARD_CLASSES}">
      <div class="h-52 overflow-hidden bg-slate-100">
        ${
          image
            ? `<img class="h-full w-full object-cover" loading="lazy" src="${image.src}" alt="${image.alt}" />`
            : ""
        }
      </div>
      <div class="p-5">
        <span class="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">${m.composicion}</span>
        <h3 class="mt-4 text-lg font-bold">${m.descripcion}</h3>
        <p class="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">${m.observacion}</p>
        <button
          data-mineral="${m.id}"
          class="detail-btn mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-500"
        >
          Ver detalles <span>→</span>
        </button>
      </div>
    </article>`;
}

/** Tarjeta del catálogo interactivo. */
export function catalogCard(m) {
  return `
    <article class="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft">
      <div class="flex items-start justify-between gap-3">
        <div>
          <span class="text-xs font-semibold tracking-wider text-indigo-600 italic">${m.fecha}</span>
          <h3 class="mt-2 text-xl font-bold text-mineral-900">${m.descripcion}</h3>
        </div>
        <span class="rounded-xl bg-mineral-50 px-3 py-2 text-sm font-semibold text-mineral-700">${m.composicion}</span>
      </div>
      <p class="mt-3 text-sm leading-6 text-slate-500">${m.observacion}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Procedencia: ${m.procedencia}</span>
        <span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Número de Muestra: ${m.nroMuestra}</span>
      </div>
      <button
        data-mineral="${m.id}"
        class="detail-btn mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-500"
      >
        Consultar ficha <span>→</span>
      </button>
    </article>`;
}

const GALLERY_BUTTON_CLASSES =
  "absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white";

function galleryArrow(id, side, label, path) {
  return `
    <button type="button" id="${id}" aria-label="${label}" class="${side}-3 ${GALLERY_BUTTON_CLASSES}">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="${path}" />
      </svg>
    </button>`;
}

/** Galería de imágenes de la ficha (vacía si el mineral no tiene imágenes). */
function gallery(images) {
  if (!images.length) return "";

  const controls =
    images.length > 1
      ? `
        ${galleryArrow("prevImage", "left", "Imagen anterior", "m15 18-6-6 6-6")}
        ${galleryArrow("nextImage", "right", "Imagen siguiente", "m9 18 6-6-6-6")}
        <span id="sliderCounter" class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          1 / ${images.length}
        </span>`
      : "";

  return `
    <div class="relative mb-6 overflow-hidden rounded-2xl bg-slate-100">
      <img id="sliderImage" src="${images[0].src}" alt="Muestra mineral" class="h-64 w-full object-contain sm:h-80" />
      ${controls}
    </div>`;
}

function detailItem(label, value) {
  return `
    <div class="rounded-xl bg-mineral-50 p-4">
      <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">${label}</dt>
      <dd class="mt-1 font-semibold text-mineral-900">${value}</dd>
    </div>`;
}

/** Contenido completo de la ficha mineralógica (modal). */
export function modalBody(m) {
  const details = [
    ["Estante", m.estante ?? "No especificado"],
    ["Numero de Muestra", m.nroMuestra],
    ["Composición", m.composicion],
    ["Procedencia", m.procedencia],
    ["Fecha", m.fecha],
  ];

  return `
    ${gallery(m.imagenes)}
    <p class="text-sm leading-7 text-slate-600">${m.observacion}</p>
    <dl class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      ${details.map(([label, value]) => detailItem(label, value)).join("")}
    </dl>`;
}

const PAGE_BUTTON_BASE =
  "grid h-10 min-w-10 place-items-center rounded-xl border px-3 text-sm font-semibold transition focus-ring";
const PAGE_BUTTON_IDLE =
  "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700";
const PAGE_BUTTON_ACTIVE = "border-indigo-600 bg-indigo-600 text-white";
const PAGE_BUTTON_DISABLED = "cursor-not-allowed opacity-40";

function pageButton({ label, page, ariaLabel, isActive = false, isDisabled = false }) {
  const state = isActive
    ? PAGE_BUTTON_ACTIVE
    : isDisabled
      ? `${PAGE_BUTTON_IDLE} ${PAGE_BUTTON_DISABLED}`
      : PAGE_BUTTON_IDLE;

  return `
    <button
      type="button"
      data-page="${page}"
      class="${PAGE_BUTTON_BASE} ${state}"
      ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}
      ${isActive ? 'aria-current="page"' : ""}
      ${isDisabled ? "disabled" : ""}
    >${label}</button>`;
}

/** Controles de paginación: anterior, números y siguiente. */
export function paginationControls(items, current, total) {
  const numbers = items.map((item) =>
    item === "…"
      ? `<span class="px-1 text-slate-400" aria-hidden="true">…</span>`
      : pageButton({
          label: item,
          page: item,
          ariaLabel: `Ir a la página ${item}`,
          isActive: item === current,
        }),
  );

  return [
    pageButton({
      label: "‹",
      page: current - 1,
      ariaLabel: "Página anterior",
      isDisabled: current === 1,
    }),
    ...numbers,
    pageButton({
      label: "›",
      page: current + 1,
      ariaLabel: "Página siguiente",
      isDisabled: current === total,
    }),
  ].join("");
}