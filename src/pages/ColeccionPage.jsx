import { useState, useMemo, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  ORDEN_ALBUM,
  SECCIONES_ESPECIALES,
  SELECCIONES,
  getLaminasDeSeccion,
  calcularStats,
} from '../data/albumData'
import { obtenerLaminas, guardarCambios } from '../services/coleccionService'

// ── Helpers ───────────────────────────────────────────────────────────────────

function laminaKey(prefijo, numero) {
  return `${prefijo}-${String(numero).padStart(2, '0')}`
}

// ── Bottom Sheet ──────────────────────────────────────────────────────────────

function BottomSheet({ lamina, cantidad, onCerrar, onChange }) {
  const numStr = String(lamina.numero).padStart(2, '0')

  let estadoLabel
  if (cantidad === 0)     estadoLabel = 'Sin lámina'
  else if (cantidad === 1) estadoLabel = 'Tengo 1 (sin repetidas)'
  else                     estadoLabel = `Tengo ${cantidad} · ${cantidad - 1} repetida${cantidad - 1 !== 1 ? 's' : ''}`

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(26,26,46,0.45)' }}
        onClick={onCerrar}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white"
        style={{ borderRadius: '24px 24px 0 0', padding: '20px 18px 32px' }}
      >
        {/* Handle */}
        <div className="w-9 h-1 rounded-full mx-auto mb-[18px]" style={{ background: '#e0dcff' }} />

        {/* Título */}
        <p className="font-bold text-base mb-[2px]" style={{ color: '#1a1a2e' }}>
          Lámina {lamina.prefijo} {numStr}
        </p>
        <p className="text-[11px] mb-5" style={{ color: '#aaa' }}>
          (1 = solo la del álbum, 2 = 1 repetida, 3 = 2 repetidas...)
        </p>

        {/* Fila de cantidad */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onChange(cantidad - 1)}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold"
            style={{ background: '#f8f7ff', border: '1.5px solid #e0dcff', color: '#534AB7' }}
          >
            −
          </button>
          <span
            className="flex-1 text-center font-bold text-[32px] leading-none"
            style={{ color: '#534AB7' }}
          >
            {cantidad}
          </span>
          <button
            onClick={() => onChange(cantidad + 1)}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold"
            style={{ background: '#534AB7', border: '1.5px solid #534AB7', color: 'white' }}
          >
            +
          </button>
        </div>

        {/* Estado */}
        <div
          className="rounded-xl px-3 py-[10px] text-center mb-4"
          style={{ background: '#f8f7ff', border: '1.5px solid #ebe8ff' }}
        >
          <span className="text-[12px] font-semibold" style={{ color: '#534AB7' }}>
            {estadoLabel}
          </span>
        </div>

        {/* Cerrar */}
        <button
          onClick={onCerrar}
          className="w-full py-[13px] rounded-xl font-semibold text-sm"
          style={{ background: '#f8f7ff', border: '1.5px solid #e0dcff', color: '#534AB7' }}
        >
          Cerrar
        </button>
      </div>
    </>
  )
}

// ── Sticker Cell ──────────────────────────────────────────────────────────────

function StickerCell({ numero, cantidad, onClick }) {
  const numStr = String(numero).padStart(2, '0')
  const estado = !cantidad ? 'missing' : cantidad === 1 ? 'have' : 'repeated'

  const estilos = {
    missing:  { background: '#f0f0f0', color: '#ccc' },
    have:     { background: '#d4f5e3', color: '#1a7a44' },
    repeated: { background: '#ede9ff', color: '#534AB7' },
  }

  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center rounded-[7px] text-[9px] font-bold transition-transform active:scale-[0.88] select-none"
      style={{ ...estilos[estado], aspectRatio: '1 / 1' }}
    >
      {numStr}
      {estado === 'repeated' && (
        <span
          className="absolute bottom-[1px] right-[2px] leading-none"
          style={{ fontSize: '7px', fontWeight: 700, color: '#534AB7' }}
        >
          ×{cantidad}
        </span>
      )}
    </button>
  )
}

// ── Accordion Section ─────────────────────────────────────────────────────────

function SeccionAccordion({ seccion, laminas, abierto, onToggle, onStickerClick }) {
  const numeros = getLaminasDeSeccion(seccion.prefijo)

  const filasSeccion = useMemo(() =>
    numeros
      .map(n => {
        const entry = laminas[laminaKey(seccion.prefijo, n)]
        return entry ? { numero: n, cantidad: entry.cantidad } : null
      })
      .filter(Boolean),
    [laminas, seccion.prefijo, numeros]
  )

  const { tengo: tengoCount, repetidas: repCount } = calcularStats(
    filasSeccion.map(f => ({ prefijo: seccion.prefijo, numero: f.numero, cantidad: f.cantidad }))
  )
  const tieneRepetidas = repCount > 0
  const icono = seccion.bandera || seccion.emoji || ''

  return (
    <div className="rounded-[14px] overflow-hidden mb-[6px]" style={{ border: '1.5px solid #f0eefe' }}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-[14px] py-[11px] text-left transition-colors"
        style={{ background: abierto ? '#f0effe' : '#faf9ff' }}
      >
        <span className="w-6 text-center leading-none" style={{ fontSize: '18px' }}>{icono}</span>
        <span className="flex-1 text-[13px] font-bold" style={{ color: '#1a1a2e' }}>
          {seccion.nombre}
        </span>
        {tengoCount > 0 && (
          <span
            className="px-2 py-[2px] rounded-full text-[10px] font-bold"
            style={{ background: '#d4f5e3', color: '#1a7a44' }}
          >
            {tengoCount}
          </span>
        )}
        {tieneRepetidas && (
          <span
            className="px-2 py-[2px] rounded-full text-[10px] font-bold"
            style={{ background: '#ede9ff', color: '#534AB7' }}
          >
            ×{repCount}
          </span>
        )}
        <span
          className="text-[12px] font-bold leading-none"
          style={{
            color: '#aaa',
            transition: 'transform 0.2s',
            display: 'inline-block',
            transform: abierto ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>

      {/* Body */}
      {abierto && (
        <div className="px-3 pb-3 pt-[10px] bg-white">
          <div className="grid grid-cols-8 gap-1">
            {numeros.map(numero => (
              <StickerCell
                key={numero}
                numero={numero}
                cantidad={laminas[laminaKey(seccion.prefijo, numero)]?.cantidad || 0}
                onClick={() => onStickerClick(seccion.prefijo, numero)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const ESPECIALES_PREFIJOS = SECCIONES_ESPECIALES.map(s => s.prefijo)

export default function ColeccionPage() {
  const { usuario } = useOutletContext()

  const [laminas, setLaminas] = useState({})
  const [guardado, setGuardado] = useState({})
  const [abiertos, setAbiertos] = useState(new Set())
  const [busqueda, setBusqueda] = useState('')
  const [filtrosActivos, setFiltrosActivos] = useState([])
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [sheet, setSheet] = useState(null) // { prefijo, numero }

  useEffect(() => {
    obtenerLaminas(usuario.id).then(inicial => {
      setLaminas(inicial)
      setGuardado(inicial)
    })
  }, [usuario.id])

  const hayChanges = JSON.stringify(laminas) !== JSON.stringify(guardado)

  const seccionesFiltradas = useMemo(() => {
    let secs = ORDEN_ALBUM
    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase()
      secs = secs.filter(s =>
        s.nombre.toLowerCase().includes(q) || s.prefijo.toLowerCase().includes(q)
      )
    }
    if (filtrosActivos.length > 0) {
      secs = secs.filter(s => filtrosActivos.includes(s.prefijo))
    }
    return secs
  }, [busqueda, filtrosActivos])

  function toggleAbierto(prefijo) {
    setAbiertos(prev => {
      const next = new Set(prev)
      next.has(prefijo) ? next.delete(prefijo) : next.add(prefijo)
      return next
    })
  }

  function toggleFiltro(prefijo) {
    setFiltrosActivos(prev =>
      prev.includes(prefijo) ? prev.filter(p => p !== prefijo) : [...prev, prefijo]
    )
  }

  function handleStickerClick(prefijo, numero) {
    const key = laminaKey(prefijo, numero)
    const qty = laminas[key]?.cantidad || 0
    if (qty === 0) {
      setLaminas(prev => ({ ...prev, [key]: { cantidad: 1 } }))
    } else {
      setSheet({ prefijo, numero })
    }
  }

  function handleSheetChange(nuevaCantidad) {
    const key = laminaKey(sheet.prefijo, sheet.numero)
    if (nuevaCantidad <= 0) {
      setLaminas(prev => {
        const next = { ...prev }
        delete next[key]
        return next
      })
      setSheet(null)
    } else {
      setLaminas(prev => ({ ...prev, [key]: { cantidad: nuevaCantidad } }))
    }
  }

  async function handleGuardar() {
    const cambios = { ...laminas }
    for (const key of Object.keys(guardado)) {
      if (!(key in laminas)) cambios[key] = { cantidad: 0 }
    }
    await guardarCambios(usuario.id, cambios)
    setGuardado({ ...laminas })
  }

  const sheetCantidad = sheet
    ? (laminas[laminaKey(sheet.prefijo, sheet.numero)]?.cantidad || 0)
    : 0

  return (
    <>
      <div>
        {/* ── Header ── */}
        <div className="bg-[#534AB7] px-[22px] pt-4 pb-5">
          <p className="text-white font-bold text-xl mb-3">Mi Colección</p>
          <div
            className="flex items-center gap-2 rounded-xl px-[14px] py-[10px]"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.25)',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>🔍</span>
            <input
              type="text"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              placeholder="Buscar sección..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/60"
            />
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: '1px solid #f0eefe' }}
        >
          <button
            onClick={() => { setFiltrosActivos([]); setMostrarFiltros(false) }}
            className="px-4 py-2 rounded-full text-[13px] font-semibold shrink-0"
            style={{
              background: filtrosActivos.length === 0 ? '#534AB7' : 'white',
              color: filtrosActivos.length === 0 ? 'white' : '#534AB7',
              border: `1.5px solid ${filtrosActivos.length === 0 ? '#534AB7' : '#c4bbff'}`,
            }}
          >
            Todos
          </button>
          <button
            onClick={() => setMostrarFiltros(v => !v)}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-semibold shrink-0"
            style={{
              background: filtrosActivos.length > 0 ? '#ede9ff' : 'white',
              color: '#534AB7',
              border: `1.5px solid ${filtrosActivos.length > 0 ? '#534AB7' : '#c4bbff'}`,
            }}
          >
            Agregar filtros
            {filtrosActivos.length > 0 && (
              <span
                className="rounded-full text-[10px] font-bold text-white"
                style={{ background: '#534AB7', padding: '1px 7px' }}
              >
                {filtrosActivos.length}
              </span>
            )}
          </button>
          {filtrosActivos.length > 0 && (
            <button
              onClick={() => setFiltrosActivos([])}
              className="ml-auto px-[14px] py-2 rounded-full text-[12px] font-semibold shrink-0"
              style={{ color: '#c0392b', border: '1.5px solid #f0dcdc' }}
            >
              Borrar filtros
            </button>
          )}
        </div>

        {/* ── Filter dropdown ── */}
        {mostrarFiltros && (
          <div
            className="px-4 py-[14px]"
            style={{ borderBottom: '1.5px solid #f0eefe', background: 'white' }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.06em] mb-2" style={{ color: '#aaa' }}>
              Especiales
            </p>
            <div className="flex flex-wrap gap-[6px] mb-4">
              {SECCIONES_ESPECIALES.map(s => {
                const activo = filtrosActivos.includes(s.prefijo)
                return (
                  <button
                    key={s.prefijo}
                    onClick={() => toggleFiltro(s.prefijo)}
                    className="px-3 py-[5px] rounded-full text-[12px] font-semibold transition-all"
                    style={{
                      border: `1.5px solid ${activo ? '#b45309' : '#ffd6a5'}`,
                      background: activo ? '#b45309' : '#fffaf3',
                      color: activo ? 'white' : '#b45309',
                    }}
                  >
                    {s.emoji} {s.prefijo}
                  </button>
                )
              })}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.06em] mb-2" style={{ color: '#aaa' }}>
              Países
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {SELECCIONES.map(s => {
                const activo = filtrosActivos.includes(s.prefijo)
                return (
                  <button
                    key={s.prefijo}
                    onClick={() => toggleFiltro(s.prefijo)}
                    className="px-3 py-[5px] rounded-full text-[12px] font-semibold transition-all"
                    style={{
                      border: `1.5px solid ${activo ? '#534AB7' : '#e0dcff'}`,
                      background: activo ? '#534AB7' : '#f8f7ff',
                      color: activo ? 'white' : '#534AB7',
                    }}
                  >
                    {s.bandera} {s.prefijo}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Leyenda ── */}
        <div className="flex items-center gap-3 px-4 py-[8px]" style={{ borderBottom: '1px solid #f0eefe' }}>
          {[
            { color: '#d4f5e3', label: 'Tengo' },
            { color: '#ede9ff', label: 'Repetida' },
            { color: '#f0f0f0', label: 'Me falta' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-[10px] h-[10px] rounded-[3px] shrink-0" style={{ background: color }} />
              <span className="text-[11px] font-semibold" style={{ color: '#888' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Acordeones ── */}
        <div className="px-[14px] pt-3 pb-6">
          {seccionesFiltradas.length === 0 ? (
            <p className="text-center text-[13px] py-10" style={{ color: '#aaa' }}>
              No se encontraron secciones
            </p>
          ) : (
            seccionesFiltradas.map(seccion => (
              <SeccionAccordion
                key={seccion.prefijo}
                seccion={seccion}
                laminas={laminas}
                abierto={abiertos.has(seccion.prefijo)}
                onToggle={() => toggleAbierto(seccion.prefijo)}
                onStickerClick={handleStickerClick}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Bottom Sheet ── */}
      {sheet && (
        <BottomSheet
          lamina={sheet}
          cantidad={sheetCantidad}
          onCerrar={() => setSheet(null)}
          onChange={handleSheetChange}
        />
      )}

      {/* ── FAB Guardar ── */}
      {hayChanges && (
        <button
          onClick={handleGuardar}
          className="fixed z-30 text-white font-bold text-sm transition-all active:scale-[0.97]"
          style={{
            bottom: '84px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#534AB7',
            borderRadius: '999px',
            padding: '12px 28px',
            boxShadow: '0 4px 20px rgba(83,74,183,0.45)',
            whiteSpace: 'nowrap',
          }}
        >
          💾 Guardar cambios
        </button>
      )}
    </>
  )
}
