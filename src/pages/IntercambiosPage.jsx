import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { buscarIntercambio } from '../services/intercambiosService'

const AVATAR_COLORS = ['#7C3AED', '#0D9488', '#D97706', '#DC2626', '#2563EB']

function avatarColor(str) {
  let h = 0
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) & 0xfffff
  return AVATAR_COLORS[h % AVATAR_COLORS.length]
}

function formatTag(key) {
  return key.replace('-', '')
}

function TagSection({ titulo, tags, variante }) {
  const esVerde = variante === 'verde'
  const colores = esVerde
    ? { bg: '#d4f5e3', border: '#a7e9c5', texto: '#1a7a44', chipBg: '#1a7a44' }
    : { bg: '#f0effe', border: '#d4ceff', texto: '#534AB7', chipBg: '#534AB7' }

  return (
    <div className="rounded-xl p-3" style={{ background: colores.bg, border: `1.5px solid ${colores.border}` }}>
      <div className="flex items-center justify-between mb-[10px]">
        <span className="text-[10px] font-bold uppercase tracking-[0.06em]" style={{ color: colores.texto }}>
          {titulo}
        </span>
        <span className="text-[10px] font-semibold" style={{ color: colores.texto }}>
          {tags.length} lámina{tags.length !== 1 ? 's' : ''}
        </span>
      </div>
      {tags.length === 0 ? (
        <p className="text-[11px]" style={{ color: colores.texto, opacity: 0.55 }}>Ninguna</p>
      ) : (
        <div className="flex flex-wrap gap-[5px]">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-[7px] py-[3px] rounded-[6px] text-[11px] font-bold text-white"
              style={{ background: colores.chipBg }}
            >
              {formatTag(tag)}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const IconoLupa = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)

const IconoWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function IntercambiosPage() {
  const { usuario } = useOutletContext()
  const [busqueda, setBusqueda] = useState('')
  const [estado, setEstado] = useState('idle')
  const [resultado, setResultado] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleBuscar() {
    const codigo = busqueda.trim().toUpperCase()
    if (!codigo) return
    setEstado('cargando')
    setResultado(null)
    setErrorMsg('')
    try {
      const data = await buscarIntercambio(usuario.id, codigo)
      setResultado(data)
      setEstado('resultado')
    } catch {
      setErrorMsg('No se encontró ningún usuario con ese código.')
      setEstado('error')
    }
  }

  const { perfil, susRepetidas = [], misRepetidas = [] } = resultado ?? {}
  const nombre = perfil?.nombre || ''
  const inicial = nombre.charAt(0).toUpperCase()

  return (
    <div>
      {/* ── Header ── */}
      <div className="bg-[#534AB7] px-[22px] pt-4 pb-5">
        <p className="text-white font-bold text-xl mb-3">Buscar Intercambio</p>
        <div className="flex gap-2">
          <div
            className="flex-1 flex items-center rounded-xl px-[14px] py-[10px]"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.25)',
            }}
          >
            <input
              type="text"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleBuscar()}
              placeholder="DANI-0042"
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/50"
              style={{ textTransform: 'uppercase' }}
            />
          </div>
          <button
            onClick={handleBuscar}
            className="w-[44px] h-[44px] rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)' }}
          >
            <IconoLupa />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-[14px] pt-[18px]">

        {estado === 'cargando' && (
          <p className="text-center text-[13px] py-10" style={{ color: '#aaa' }}>Buscando...</p>
        )}

        {estado === 'error' && (
          <p className="text-center text-[13px] py-10" style={{ color: '#e53e3e' }}>{errorMsg}</p>
        )}

        {estado === 'resultado' && resultado && (
          <div
            className="rounded-2xl bg-white p-4 flex flex-col gap-3"
            style={{ border: '1.5px solid #ebe8ff' }}
          >
            {/* Info usuario */}
            <div className="flex items-center gap-3">
              <div
                className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0"
                style={{ background: avatarColor(nombre) }}
              >
                <span className="text-white font-bold text-[18px] leading-none">{inicial}</span>
              </div>
              <div>
                <p className="font-bold text-[15px]" style={{ color: '#1a1a2e' }}>{nombre}</p>
                <p className="text-[12px]" style={{ color: '#888' }}>{perfil.user_code}</p>
              </div>
            </div>

            <TagSection
              titulo="Sus repetidas que te faltan"
              tags={susRepetidas}
              variante="morado"
            />

            <TagSection
              titulo="Tus repetidas que le faltan"
              tags={misRepetidas}
              variante="verde"
            />

            <button
              className="w-full py-[14px] rounded-xl flex items-center justify-center gap-2 font-bold text-sm text-white"
              style={{ background: '#534AB7' }}
            >
              <IconoWhatsApp />
              Solicitar intercambio
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
