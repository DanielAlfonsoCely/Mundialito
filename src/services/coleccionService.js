import { supabase } from './supabaseClient'
import { calcularStats } from '../data/albumData'

export async function obtenerLaminas(usuarioId) {
  const { data, error } = await supabase
    .from('laminas_usuario')
    .select('prefijo, numero, cantidad')
    .eq('usuario_id', usuarioId)

  if (error) throw error

  return Object.fromEntries(
    data.map(({ prefijo, numero, cantidad }) => [
      `${prefijo}-${String(numero).padStart(2, '0')}`,
      { cantidad },
    ])
  )
}

export async function obtenerStats(usuarioId) {
  const { data, error } = await supabase
    .from('laminas_usuario')
    .select('prefijo, numero, cantidad')
    .eq('usuario_id', usuarioId)

  if (error) throw error

  return calcularStats(data)
}

export async function guardarCambios(usuarioId, cambios) {
  const ops = Object.entries(cambios).map(([key, { cantidad }]) => {
    const idx = key.indexOf('-')
    const prefijo = key.slice(0, idx)
    const numero = parseInt(key.slice(idx + 1), 10)

    if (cantidad > 0) {
      return supabase
        .from('laminas_usuario')
        .upsert(
          { usuario_id: usuarioId, prefijo, numero, cantidad },
          { onConflict: 'usuario_id,prefijo,numero' }
        )
        .then(({ error }) => { if (error) throw error })
    }

    return supabase
      .from('laminas_usuario')
      .delete()
      .eq('usuario_id', usuarioId)
      .eq('prefijo', prefijo)
      .eq('numero', numero)
      .then(({ error }) => { if (error) throw error })
  })

  await Promise.all(ops)
}
