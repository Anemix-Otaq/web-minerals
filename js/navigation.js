// Navegación: menú móvil, botón de búsqueda del header y resaltado por scroll.

import { $, $$ } from "./utils.js";

const SECTION_IDS = ["inicio", "minerales", "acerca", "contacto"];
const SEARCH_FOCUS_DELAY_MS = 450;

function initMobileMenu() {
  const button = $("#mobileMenuBtn");
  const nav = $("#mobileNav");

  function setOpen(isOpen) {
    nav.classList.toggle("hidden", !isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  }

  button.addEventListener("click", () =>
    setOpen(nav.classList.contains("hidden")),
  );
  $$("a", nav).forEach((link) =>
    link.addEventListener("click", () => setOpen(false)),
  );
}

function initHeaderSearch() {
  $("#headerSearchBtn").addEventListener("click", () => {
    $("#catalogo").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("#mineralSearch").focus(), SEARCH_FOCUS_DELAY_MS);
  });
}

// Resalta en el menú de escritorio la sección visible.
function initScrollSpy() {
  if (!("IntersectionObserver" in window)) return;

  const navLinks = $$(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`,
          ),
        );
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );

  SECTION_IDS.forEach((id) => observer.observe(document.getElementById(id)));
}

export function initNavigation() {
  initMobileMenu();
  initHeaderSearch();
  initScrollSpy();
}
