// Slider del hero: botones, puntos y avance automático.

import { SLIDER_INTERVAL_MS } from "./config.js";
import { $, $$ } from "./utils.js";

export function initSlider() {
  const slides = $$(".hero-slide");
  const dots = $$(".dot");
  let current = 0;
  let timer;

  function show(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) =>
      slide.classList.toggle("active", i === current),
    );
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }

  // Reinicia el temporizador (no hay avance automático si el usuario
  // prefiere reducir el movimiento).
  function restartTimer() {
    clearInterval(timer);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setInterval(() => show(current + 1), SLIDER_INTERVAL_MS);
    }
  }

  function goTo(index) {
    show(index);
    restartTimer();
  }

  $("#prevSlide").addEventListener("click", () => goTo(current - 1));
  $("#nextSlide").addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

  restartTimer();
}
