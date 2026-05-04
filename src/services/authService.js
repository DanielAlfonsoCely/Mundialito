import { supabase } from './supabaseClient'

export async function registrar(nombre, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nombre }
    }
  })
  if (error) throw error

  const { count } = await supabase.from('perfiles').select('*', { count: 'exact', head: true })
  const n = (count ?? 0) + 1
  const letras = nombre.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase().padEnd(4, 'X')
  const user_code = `${letras}-${String(n).padStart(4, '0')}`

  await supabase.from('perfiles').update({ user_code }).eq('id', data.user.id)

  return data
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function obtenerSesion() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}
