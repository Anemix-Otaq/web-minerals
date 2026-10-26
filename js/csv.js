// Parser de CSV sencillo con soporte de campos entre comillas.

/**
 * Convierte texto CSV en un arreglo de objetos.
 * La primera fila se usa como encabezados (en minúsculas).
 */
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let insideQuotes = false;

  text = text.replace(/^\uFEFF/, ""); // elimina BOM

  const endField = () => {
    row.push(field.trim());
    field = "";
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      field += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      endField();
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") i++;

      endField();
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    endField();
    rows.push(row);
  }

  if (!rows.length) return [];

  const headers = rows.shift().map((header) => header.trim().toLowerCase());

  return rows.map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? ""]),
    ),
  );
}
