import { logout } from '../services/authService'

export default function PerfilPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-4">
      <h1 className="font-bold text-xl" style={{ color: '#534AB7' }}>Perfil</h1>
      <button
        onClick={logout}
        className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        style={{ background: '#fff0f0', color: '#e53e3e', border: '1.5px solid #fecaca' }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}
