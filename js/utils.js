// Utilidades generales.

export const $ = (selector, scope = document) => scope.querySelector(selector);

export const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

/** Devuelve `count` elementos aleatorios y sin repetir de `items`. */
export function pickRandom(items, count) {
  const pool = [...items];

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
}

/**
 * Devuelve los números de página a mostrar, con "…" cuando hay muchas.
 * Ej.: [1, "…", 4, 5, 6, "…", 12]
 */
export function getPageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  return sorted.flatMap((page, i) =>
    i > 0 && page - sorted[i - 1] > 1 ? ["…", page] : [page],
  );
}