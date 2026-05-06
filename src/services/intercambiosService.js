import { supabase } from './supabaseClient'

export async function buscarIntercambio(miUsuarioId, userCode) {
  const { data: perfil, error: perfilError } = await supabase
    .from('perfiles')
    .select('id, nombre, user_code')
    .eq('user_code', userCode)
    .single()

  if (perfilError) throw new Error('Usuario no encontrado')

  const [{ data: misLaminas, error: e1 }, { data: susLaminas, error: e2 }] = await Promise.all([
    supabase.from('laminas_usuario').select('prefijo, numero, cantidad').eq('usuario_id', miUsuarioId),
    supabase.from('laminas_usuario').select('prefijo, numero, cantidad').eq('usuario_id', perfil.id),
  ])

  if (e1) throw e1
  if (e2) throw e2

  const miMap = {}
  for (const { prefijo, numero, cantidad } of misLaminas) {
    miMap[`${prefijo}-${String(numero).padStart(2, '0')}`] = cantidad
  }

  const suMap = {}
  for (const { prefijo, numero, cantidad } of susLaminas) {
    suMap[`${prefijo}-${String(numero).padStart(2, '0')}`] = cantidad
  }

  const susRepetidas = Object.entries(suMap)
    .filter(([key, cantidad]) => cantidad > 1 && !miMap[key])
    .map(([key]) => key)
    .sort()

  const misRepetidas = Object.entries(miMap)
    .filter(([key, cantidad]) => cantidad > 1 && !suMap[key])
    .map(([key]) => key)
    .sort()

  return { perfil, susRepetidas, misRepetidas }
}
