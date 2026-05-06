import { supabase } from './supabaseClient'

export async function obtenerPerfil(usuarioId) {
  const { data, error } = await supabase
    .from('perfiles')
    .select('user_code, telefono')
    .eq('id', usuarioId)
    .single()

  if (error) throw error
  return data
}
