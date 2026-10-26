// Configuración de Tailwind (CDN). Debe cargarse después de cdn.tailwindcss.com.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        mineral: {
          950: "#101827",
          900: "#172235",
          800: "#24334b",
          700: "#334766",
          600: "#4f46b5",
          500: "#6258d7",
          100: "#eeedff",
          50: "#f7f7fc",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 35px rgba(20, 30, 55, .08)",
      },
    },
  },
};
