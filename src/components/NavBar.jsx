import { NavLink } from 'react-router-dom'

function IconHome({ active }) {
  const c = active ? '#534AB7' : '#bbb'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z"
        stroke={c} strokeWidth="1.8" strokeLinejoin="round"
        fill={active ? '#534AB7' : 'none'} fillOpacity={active ? 0.15 : 0}
      />
      <path d="M9 21V13h6v8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconColeccion({ active }) {
  const c = active ? '#534AB7' : '#bbb'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="4" y="3" width="16" height="18" rx="2"
        stroke={c} strokeWidth="1.8"
        fill={active ? '#534AB7' : 'none'} fillOpacity={active ? 0.15 : 0}
      />
      <path d="M8 8h8M8 12h8M8 16h5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconIntercambios({ active }) {
  const c = active ? '#534AB7' : '#bbb'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 17V7m0 0L4 10m3-3l3 3" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 7v10m0 0l3-3m-3 3l-3-3" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPerfil({ active }) {
  const c = active ? '#534AB7' : '#bbb'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12" cy="8" r="4"
        stroke={c} strokeWidth="1.8"
        fill={active ? '#534AB7' : 'none'} fillOpacity={active ? 0.15 : 0}
      />
      <path d="M4 20c0-3.866 3.582-7 8-7s8 3.134 8 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const tabs = [
  { to: '/',              label: 'Inicio',       Icon: IconHome },
  { to: '/coleccion',    label: 'Colección',    Icon: IconColeccion },
  { to: '/intercambios', label: 'Intercambios', Icon: IconIntercambios },
  { to: '/perfil',       label: 'Perfil',       Icon: IconPerfil },
]

export default function NavBar() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex h-[72px] bg-white"
      style={{ borderTop: '1.5px solid #f0eefe' }}
    >
      {tabs.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className="flex-1 flex flex-col items-center justify-center gap-[3px] select-none"
        >
          {({ isActive }) => (
            <>
              <Icon active={isActive} />
              <span
                className="text-[10px] font-semibold leading-none"
                style={{ color: isActive ? '#534AB7' : '#aaa' }}
              >
                {label}
              </span>
              <div
                className="w-1 h-1 rounded-full transition-opacity duration-150"
                style={{
                  background: '#534AB7',
                  opacity: isActive ? 1 : 0,
                }}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
