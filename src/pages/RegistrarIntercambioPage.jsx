import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function parseLaminas(texto) {
  return texto
    .split(',')
    .map(s => s.trim().toUpperCase())
    .filter(Boolean)
}

function TextareaLaminas({ value, onChange, placeholder, accentColor }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full rounded-xl px-3 py-[10px] text-sm resize-none outline-none transition-colors"
      style={{
        background: '#f8f7ff',
        border: `1.5px solid ${focused ? accentColor : '#e0dcff'}`,
        minHeight: '90px',
        color: '#1a1a2e',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

export default function RegistrarIntercambioPage() {
  const navigate = useNavigate()
  const [di, setDi] = useState('')
  const [recibi, setRecibi] = useState('')

  const laminasDi = parseLaminas(di)
  const laminasRecibi = parseLaminas(recibi)
  const puedeConfirmar = laminasDi.length > 0 && laminasRecibi.length > 0

  return (
    <div>
      {/* ── Header ── */}
      <div className="bg-[#534AB7] px-[22px] pt-4 pb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm mb-3 transition-opacity active:opacity-60"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          ← Volver
        </button>
        <p className="text-white font-bold text-xl">Registrar Intercambio</p>
        <p className="text-[13px] mt-[3px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Actualizá tu colección después de un canje
        </p>
      </div>

      {/* ── Body ── */}
      <div className="px-4 pt-4 pb-6">

        {/* Columnas de input */}
        <div className="flex gap-[10px] mb-4">

          {/* YO DI */}
          <div className="flex-1">
            <div className="flex items-center gap-[5px] mb-[6px]">
              <div className="w-2 h-2 rounded-full bg-[#534AB7]" />
              <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#534AB7]">
                Yo di
              </span>
            </div>
            <TextareaLaminas
              value={di}
              onChange={setDi}
              placeholder="ARG05, BRA11..."
              accentColor="#534AB7"
            />
            <p className="text-[10px] mt-[5px]" style={{ color: '#aaa' }}>Separadas por coma</p>
          </div>

          {/* YO RECIBÍ */}
          <div className="flex-1">
            <div className="flex items-center gap-[5px] mb-[6px]">
              <div className="w-2 h-2 rounded-full" style={{ background: '#1a7a44' }} />
              <span className="text-[12px] font-bold uppercase tracking-[0.06em]" style={{ color: '#1a7a44' }}>
                Yo recibí
              </span>
            </div>
            <TextareaLaminas
              value={recibi}
              onChange={setRecibi}
              placeholder="COL03, MEX07..."
              accentColor="#16a34a"
            />
            <p className="text-[10px] mt-[5px]" style={{ color: '#aaa' }}>Separadas por coma</p>
          </div>

        </div>

        {/* Vista previa */}
        <div className="mb-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.06em] mb-2" style={{ color: '#888' }}>
            Vista previa
          </p>
          <div className="flex gap-[10px]">

            {/* Di */}
            <div className="flex-1">
              <p className="text-[10px] font-semibold mb-[5px]" style={{ color: '#aaa' }}>
                Di ({laminasDi.length})
              </p>
              <div className="flex flex-wrap gap-1" style={{ minHeight: '28px' }}>
                {laminasDi.length > 0 ? laminasDi.map((lam, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-[6px] text-[11px] font-bold whitespace-nowrap"
                    style={{ background: '#ede9ff', color: '#534AB7' }}
                  >
                    {lam}
                  </span>
                )) : (
                  <span className="text-[11px] py-1" style={{ color: '#ccc' }}>—</span>
                )}
              </div>
            </div>

            {/* Recibí */}
            <div className="flex-1">
              <p className="text-[10px] font-semibold mb-[5px]" style={{ color: '#aaa' }}>
                Recibí ({laminasRecibi.length})
              </p>
              <div className="flex flex-wrap gap-1" style={{ minHeight: '28px' }}>
                {laminasRecibi.length > 0 ? laminasRecibi.map((lam, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-[6px] text-[11px] font-bold whitespace-nowrap"
                    style={{ background: '#d4f5e3', color: '#1a7a44' }}
                  >
                    {lam}
                  </span>
                )) : (
                  <span className="text-[11px] py-1" style={{ color: '#ccc' }}>—</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Botón confirmar */}
        <button
          disabled={!puedeConfirmar}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all"
          style={{
            background: puedeConfirmar ? '#534AB7' : '#c5bff5',
            cursor: puedeConfirmar ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.2px',
          }}
        >
          Confirmar intercambio
        </button>

      </div>
    </div>
  )
}
