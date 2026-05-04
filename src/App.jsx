import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import InicioPage from './pages/InicioPage'
import ColeccionPage from './pages/ColeccionPage'
import IntercambiosPage from './pages/IntercambiosPage'
import PerfilPage from './pages/PerfilPage'
import RegistrarIntercambioPage from './pages/RegistrarIntercambioPage'
import NavBar from './components/NavBar'

function Cargando() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0effe]">
      <p className="text-[#534AB7] text-sm font-semibold">Cargando...</p>
    </div>
  )
}

function AuthLayout() {
  const { usuario, cargando } = useAuth()

  if (cargando) return <Cargando />
  if (!usuario) return <Navigate to="/login" replace />

  return (
    <div className="max-w-[430px] mx-auto bg-white min-h-screen">
      <div className="pb-[72px]">
        <Outlet context={{ usuario }} />
      </div>
      <NavBar />
    </div>
  )
}

function PublicRoute({ children }) {
  const { usuario, cargando } = useAuth()
  if (cargando) return <Cargando />
  return usuario ? <Navigate to="/" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route element={<AuthLayout />}>
          <Route path="/" element={<InicioPage />} />
          <Route path="/coleccion" element={<ColeccionPage />} />
          <Route path="/intercambios" element={<IntercambiosPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/registrar-intercambio" element={<RegistrarIntercambioPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
