// albumData.js
// Estructura completa del álbum Panini Mundial 2026
// Total: 19 (FWC) + 960 (selecciones) + 12 (COKE) = 991 láminas

export const TOTAL_LAMINAS = 991

// ─── Secciones especiales ────────────────────────────────────────────────────

export const SECCIONES_ESPECIALES = [
  {
    prefijo: 'FWC',
    nombre: 'FIFA World Cup',
    emoji: '🏆',
    total: 19,
  },
  {
    prefijo: 'COKE',
    nombre: 'Coca-Cola',
    emoji: '🥤',
    total: 12,
  },
]

// ─── 48 Selecciones — orden oficial del álbum (por grupos A→L) ───────────────
// Cada selección tiene 20 láminas: 1 escudo (foil) + 1 foto equipo + 18 jugadores
// Lámina 01 = escudo, 13 = foto equipo (según el patrón Panini estándar)
// Código FIFA oficial de 3 letras

export const SELECCIONES = [
  // Grupo A
  { prefijo: 'MEX', nombre: 'México',               grupo: 'A', bandera: '🇲🇽', total: 20 },
  { prefijo: 'RSA', nombre: 'Sudáfrica',             grupo: 'A', bandera: '🇿🇦', total: 20 },
  { prefijo: 'KOR', nombre: 'República de Corea',   grupo: 'A', bandera: '🇰🇷', total: 20 },
  { prefijo: 'CZE', nombre: 'Chequia',               grupo: 'A', bandera: '🇨🇿', total: 20 },

  // Grupo B
  { prefijo: 'CAN', nombre: 'Canadá',                grupo: 'B', bandera: '🇨🇦', total: 20 },
  { prefijo: 'BIH', nombre: 'Bosnia y Herzegovina',  grupo: 'B', bandera: '🇧🇦', total: 20 },
  { prefijo: 'QAT', nombre: 'Catar',                 grupo: 'B', bandera: '🇶🇦', total: 20 },
  { prefijo: 'SUI', nombre: 'Suiza',                 grupo: 'B', bandera: '🇨🇭', total: 20 },

  // Grupo C
  { prefijo: 'BRA', nombre: 'Brasil',                grupo: 'C', bandera: '🇧🇷', total: 20 },
  { prefijo: 'MAR', nombre: 'Marruecos',             grupo: 'C', bandera: '🇲🇦', total: 20 },
  { prefijo: 'HAI', nombre: 'Haití',                 grupo: 'C', bandera: '🇭🇹', total: 20 },
  { prefijo: 'SCO', nombre: 'Escocia',               grupo: 'C', bandera: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', total: 20 },

  // Grupo D
  { prefijo: 'USA', nombre: 'EE. UU.',               grupo: 'D', bandera: '🇺🇸', total: 20 },
  { prefijo: 'PAR', nombre: 'Paraguay',              grupo: 'D', bandera: '🇵🇾', total: 20 },
  { prefijo: 'AUS', nombre: 'Australia',             grupo: 'D', bandera: '🇦🇺', total: 20 },
  { prefijo: 'TUR', nombre: 'Turquía',               grupo: 'D', bandera: '🇹🇷', total: 20 },

  // Grupo E
  { prefijo: 'GER', nombre: 'Alemania',              grupo: 'E', bandera: '🇩🇪', total: 20 },
  { prefijo: 'CUW', nombre: 'Curazao',               grupo: 'E', bandera: '🇨🇼', total: 20 },
  { prefijo: 'CIV', nombre: 'Costa de Marfil',       grupo: 'E', bandera: '🇨🇮', total: 20 },
  { prefijo: 'ECU', nombre: 'Ecuador',               grupo: 'E', bandera: '🇪🇨', total: 20 },

  // Grupo F
  { prefijo: 'NED', nombre: 'Países Bajos',          grupo: 'F', bandera: '🇳🇱', total: 20 },
  { prefijo: 'JPN', nombre: 'Japón',                 grupo: 'F', bandera: '🇯🇵', total: 20 },
  { prefijo: 'SWE', nombre: 'Suecia',                grupo: 'F', bandera: '🇸🇪', total: 20 },
  { prefijo: 'TUN', nombre: 'Túnez',                 grupo: 'F', bandera: '🇹🇳', total: 20 },

  // Grupo G
  { prefijo: 'BEL', nombre: 'Bélgica',               grupo: 'G', bandera: '🇧🇪', total: 20 },
  { prefijo: 'EGY', nombre: 'Egipto',                grupo: 'G', bandera: '🇪🇬', total: 20 },
  { prefijo: 'IRN', nombre: 'Irán',                  grupo: 'G', bandera: '🇮🇷', total: 20 },
  { prefijo: 'NZL', nombre: 'Nueva Zelanda',         grupo: 'G', bandera: '🇳🇿', total: 20 },

  // Grupo H
  { prefijo: 'ESP', nombre: 'España',                grupo: 'H', bandera: '🇪🇸', total: 20 },
  { prefijo: 'CPV', nombre: 'Cabo Verde',            grupo: 'H', bandera: '🇨🇻', total: 20 },
  { prefijo: 'KSA', nombre: 'Arabia Saudita',        grupo: 'H', bandera: '🇸🇦', total: 20 },
  { prefijo: 'URU', nombre: 'Uruguay',               grupo: 'H', bandera: '🇺🇾', total: 20 },

  // Grupo I
  { prefijo: 'FRA', nombre: 'Francia',               grupo: 'I', bandera: '🇫🇷', total: 20 },
  { prefijo: 'SEN', nombre: 'Senegal',               grupo: 'I', bandera: '🇸🇳', total: 20 },
  { prefijo: 'IRQ', nombre: 'Irak',                  grupo: 'I', bandera: '🇮🇶', total: 20 },
  { prefijo: 'NOR', nombre: 'Noruega',               grupo: 'I', bandera: '🇳🇴', total: 20 },

  // Grupo J
  { prefijo: 'ARG', nombre: 'Argentina',             grupo: 'J', bandera: '🇦🇷', total: 20 },
  { prefijo: 'ALG', nombre: 'Argelia',               grupo: 'J', bandera: '🇩🇿', total: 20 },
  { prefijo: 'AUT', nombre: 'Austria',               grupo: 'J', bandera: '🇦🇹', total: 20 },
  { prefijo: 'JOR', nombre: 'Jordania',              grupo: 'J', bandera: '🇯🇴', total: 20 },

  // Grupo K
  { prefijo: 'POR', nombre: 'Portugal',              grupo: 'K', bandera: '🇵🇹', total: 20 },
  { prefijo: 'COD', nombre: 'RD Congo',              grupo: 'K', bandera: '🇨🇩', total: 20 },
  { prefijo: 'UZB', nombre: 'Uzbekistán',            grupo: 'K', bandera: '🇺🇿', total: 20 },
  { prefijo: 'COL', nombre: 'Colombia',              grupo: 'K', bandera: '🇨🇴', total: 20 },

  // Grupo L
  { prefijo: 'ENG', nombre: 'Inglaterra',            grupo: 'L', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', total: 20 },
  { prefijo: 'CRO', nombre: 'Croacia',               grupo: 'L', bandera: '🇭🇷', total: 20 },
  { prefijo: 'GHA', nombre: 'Ghana',                 grupo: 'L', bandera: '🇬🇭', total: 20 },
  { prefijo: 'PAN', nombre: 'Panamá',                grupo: 'L', bandera: '🇵🇦', total: 20 },
]

// ─── Orden completo del álbum ─────────────────────────────────────────────────
// FWC (1-19) → 48 selecciones en orden (20 c/u) → COKE (1-12)

export const ORDEN_ALBUM = [
  SECCIONES_ESPECIALES[0], // FWC
  ...SELECCIONES,
  SECCIONES_ESPECIALES[1], // COKE
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Obtener sección por prefijo (busca en especiales y selecciones)
export function getSeccion(prefijo) {
  return (
    SECCIONES_ESPECIALES.find(s => s.prefijo === prefijo) ||
    SELECCIONES.find(s => s.prefijo === prefijo) ||
    null
  )
}

// Generar todas las láminas de una sección como array de números
export function getLaminasDeSeccion(prefijo) {
  const seccion = getSeccion(prefijo)
  if (!seccion) return []
  return Array.from({ length: seccion.total }, (_, i) => i + 1)
}

// Calcular stats desde filas de laminas_usuario
// filas = [{ prefijo, numero, cantidad }]
export function calcularStats(filas) {
  const tengo = filas.length
  const repetidas = filas.reduce((sum, f) => sum + Math.max(0, f.cantidad - 1), 0)
  const meFaltan = TOTAL_LAMINAS - tengo
  const porcentaje = Math.round((tengo / TOTAL_LAMINAS) * 100)
  return { tengo, repetidas, meFaltan, porcentaje }
}
