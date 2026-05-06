import { useState, useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { TOTAL_LAMINAS } from '../data/albumData'
import { obtenerStats } from '../services/coleccionService'

const QUICK_ACTIONS = [
  {
    emoji: '🔍',
    titulo: 'Buscar intercambio',
    subtitulo: 'Encontrá con quién intercambiar',
    bg: '#ede9ff',
    ruta: '/intercambios',
  },
  {
    emoji: '📚',
    titulo: 'Mi colección',
    subtitulo: 'Revisá y gestioná tus láminas',
    bg: '#d4f5e3',
    ruta: '/coleccion',
  },
  {
    emoji: '📝',
    titulo: 'Registrar intercambio',
    subtitulo: 'Actualizá tu colección tras un canje',
    bg: '#fff3d6',
    ruta: '/registrar-intercambio',
  },
]

export default function InicioPage() {
  const { usuario } = useOutletContext()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    obtenerStats(usuario.id).then(setStats)
  }, [usuario.id])

  const nombre = usuario?.user_metadata?.nombre || usuario?.email || ''
  const primerNombre = nombre.split(' ')[0]
  const inicial = nombre.charAt(0).toUpperCase()
  const progreso = stats?.porcentaje ?? 0

  return (
    <div>
      {/* ── Header ── */}
      <div className="bg-[#534AB7] px-[22px] pt-4 pb-6">
        {/* Fila título + avatar */}
        <div className="flex items-start justify-between mb-[14px]">
          <div>
            <p className="text-white font-bold text-[22px] tracking-tight leading-tight">⚽ Mundialito</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Hola, {primerNombre} 👋
            </p>
          </div>
          <div
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)' }}
          >
            {inicial}
          </div>
        </div>

        {/* Tarjeta progreso */}
        <div className="rounded-2xl px-4 py-[14px]" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Progreso del álbum
            </span>
            <span className="text-white font-bold text-2xl">
              {stats ? `${stats.porcentaje}%` : '—'}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progreso}%`,
                background: 'linear-gradient(90deg, #a8ff78 0%, #78ffd6 100%)',
              }}
            />
          </div>
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {stats ? `${stats.tengo} de ${TOTAL_LAMINAS} láminas conseguidas` : '—'}
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-[18px] pt-[18px]">
        {/* Stats */}
        <div className="flex gap-3 mb-5">
          {[
            { emoji: '🔄', valor: stats?.repetidas, label: 'Repetidas' },
            { emoji: '🔍', valor: stats?.meFaltan,  label: 'Me faltan' },
            { emoji: '✅', valor: stats?.tengo,     label: 'Tengo' },
          ].map(({ emoji, valor, label }) => (
            <div
              key={label}
              className="flex-1 rounded-2xl px-[14px] pt-[14px] pb-3"
              style={{ background: '#f8f7ff', border: '1.5px solid #ebe8ff' }}
            >
              <p className="text-xl mb-1">{emoji}</p>
              <p className="font-bold text-[28px] leading-none" style={{ color: '#534AB7' }}>
                {valor ?? '—'}
              </p>
              <p className="text-[11px] font-medium mt-[3px]" style={{ color: '#888' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Acceso rápido */}
        <p className="font-bold text-sm mb-[10px]" style={{ color: '#1a1a2e' }}>Acceso rápido</p>
        <div className="flex flex-col gap-[10px] pb-6">
          {QUICK_ACTIONS.map(({ emoji, titulo, subtitulo, bg, ruta }) => (
            <button
              key={titulo}
              onClick={() => navigate(ruta)}
              className="flex items-center gap-[14px] rounded-2xl px-4 py-[14px] text-left w-full transition-all active:scale-[0.99]"
              style={{ background: '#f8f7ff', border: '1.5px solid #ebe8ff' }}
            >
              <div
                className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: bg }}
              >
                {emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{titulo}</p>
                <p className="text-[11px] mt-[1px]" style={{ color: '#888' }}>{subtitulo}</p>
              </div>
              <span className="text-base shrink-0" style={{ color: '#ccc' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
