const URL_API = 'https://genshin-db-api.vercel.app/api/v5/characters'

// Convierte un personaje de la API a la forma que usa la app
export function normalizarPersonaje(p) {
  return {
    id: p.id,
    name: p.name,
    rarity: `${p.rarity}_star`, // 4 -> "4_star"
    weapon: p.weaponText ?? 'Desconocida',
    vision: p.elementText ?? 'Ninguno',
    region: p.region || 'Sin nación',
    imagen: p.images?.hoyowiki_icon ?? null,
  }
}

// Primer fetch: lista de todos los personajes
export async function obtenerPersonajes(signal) {
  const respuesta = await fetch(
    `${URL_API}?query=names&matchCategories=true&verboseCategories=true`,
    { signal }
  )
  if (!respuesta.ok) throw new Error('No se pudo cargar la información.')

  const datos = await respuesta.json()
  if (!Array.isArray(datos)) throw new Error('La API devolvió un formato inesperado.')

  return datos
    .map(normalizarPersonaje)
    .sort((a, b) => a.name.localeCompare(b.name))
}

// Pide una consulta y devuelve el primer personaje, o null si no hay resultado
async function pedirConsulta(consulta, signal) {
  const respuesta = await fetch(`${URL_API}?query=${encodeURIComponent(consulta)}`, { signal })
  if (!respuesta.ok) throw new Error('No se pudo cargar la información.')

  const texto = await respuesta.text()
  if (!texto) return null // la API responde vacío cuando no hay resultado

  const datos = JSON.parse(texto)
  return Array.isArray(datos) ? (datos[0] ?? null) : datos
}

// Segundo fetch: un personaje por ID
export async function obtenerPersonaje(id, signal) {
  const porId = await pedirConsulta(id, signal)
  if (porId && String(porId.id) === String(id)) return porId

  // Si la API no busca por ID, se busca el nombre en la lista y se consulta por nombre
  const lista = await obtenerPersonajes(signal)
  const base = lista.find((p) => String(p.id) === String(id))
  if (!base) return null
  return pedirConsulta(base.name, signal)
}