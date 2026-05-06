import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { logout } from '../services/authService'
import { obtenerPerfil } from '../services/perfilService'
import { obtenerStats } from '../services/coleccionService'

function StatRow({ label, valor, ultimo = false }) {
  return (
    <div
      className="flex items-center justify-between py-[15px] px-[18px]"
      style={!ultimo ? { borderBottom: '1px solid #f0eefe' } : {}}
    >
      <span className="text-[13px]" style={{ color: '#1a1a2e' }}>{label}</span>
      <span className="text-[13px] font-bold" style={{ color: '#534AB7' }}>{valor}</span>
    </div>
  )
}

function ActionRow({ label, onClick, danger = false, ultimo = false }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-[18px] py-[15px] text-left"
      style={!ultimo ? { borderBottom: '1px solid #f0eefe' } : {}}
    >
      <span className="text-[13px] font-medium" style={{ color: danger ? '#e53e3e' : '#1a1a2e' }}>
        {label}
      </span>
      <span className="text-base" style={{ color: danger ? '#fca5a5' : '#ccc' }}>›</span>
    </button>
  )
}

export default function PerfilPage() {
  const { usuario } = useOutletContext()
  const [perfil, setPerfil] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    Promise.all([
      obtenerPerfil(usuario.id),
      obtenerStats(usuario.id),
    ]).then(([p, s]) => {
      setPerfil(p)
      setStats(s)
    })
  }, [usuario.id])

  const nombre = usuario?.user_metadata?.nombre || usuario?.email || ''
  const inicial = nombre.charAt(0).toUpperCase()

  return (
    <div>
      {/* ── Header ── */}
      <div className="bg-[#534AB7] px-[22px] pt-8 pb-7 flex flex-col items-center">
        {/* Avatar */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-3"
          style={{ background: 'rgba(255,255,255,0.22)', border: '2.5px solid rgba(255,255,255,0.4)' }}
        >
          <span className="text-white font-bold text-[28px] leading-none">{inicial}</span>
        </div>

        {/* Nombre */}
        <p className="text-white font-bold text-[20px] leading-tight mb-[4px]">{nombre}</p>

        {/* user_code · teléfono */}
        <p className="text-[12px] mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {perfil ? perfil.user_code : '—'}
        </p>
        <p className="text-[12px] mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {perfil ? (perfil.telefono || '') : '—'}
        </p>

        {/* Progreso pill */}
        <div
          className="px-6 py-[10px] rounded-2xl flex items-baseline gap-[6px]"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <span className="text-white font-bold text-[22px] leading-none">
            {stats ? `${stats.porcentaje}%` : '—'}
          </span>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.75)' }}>álbum completado</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-[14px] pt-[18px] flex flex-col gap-[10px]">

        {/* Stats */}
        <div className="rounded-2xl overflow-hidden bg-white" style={{ border: '1.5px solid #ebe8ff' }}>
          <StatRow label="Mis intercambios realizados" valor="0" />
          <StatRow label="Láminas canjeadas en total" valor="0" ultimo />
        </div>

        {/* Acciones */}
        <div className="rounded-2xl overflow-hidden bg-white" style={{ border: '1.5px solid #ebe8ff' }}>
          <ActionRow label="Notificaciones" />
          <ActionRow label="Privacidad" />
          <ActionRow label="Cerrar sesión" onClick={logout} danger ultimo />
        </div>

      </div>
    </div>
  )
}
