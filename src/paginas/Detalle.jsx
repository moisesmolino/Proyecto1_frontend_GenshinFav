import './Detalle.css'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { normalizarPersonaje, obtenerPersonaje } from '../api'
import Cargando from '../components/Cargando'
import MensajeError from '../components/MensajeError'

function Detalle({ favoritos = [], onToggleFavorito }) {
  const { id } = useParams()
  const [personaje, setPersonaje] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)
  const [imagenFallida, setImagenFallida] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setCargando(true)
    setError(null)
    setImagenFallida(false)

    obtenerPersonaje(id, controller.signal)
      .then((datos) => {
        setPersonaje(datos)
        setCargando(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError('Verifica tu conexión e intenta de nuevo.')
        setCargando(false)
      })

    return () => controller.abort()
  }, [id, intento])

  if (cargando) return <Cargando mensaje="Cargando personaje…" />

  if (error) {
    return (
      <MensajeError
        mensaje={error}
        onReintentar={() => setIntento((n) => n + 1)}
        mostrarInicio
      />
    )
  }

  if (!personaje) {
    return (
      <div className="detalle__estado">
        <p>No encontramos este personaje.</p>
        <NavLink to="/explorar" className="detalle__volver">← Volver a explorar</NavLink>
      </div>
    )
  }

  // Objeto con la misma forma que usan las tarjetas y los favoritos
  const resumen = normalizarPersonaje(personaje)
  const esFavorito = favoritos.some((f) => f.id === resumen.id)
  const estrellas = Number(personaje.rarity) || 0

  const datos = [
    ['Elemento', personaje.elementText],
    ['Arma', personaje.weaponText],
    ['Género', personaje.gender],
    ['Nación', personaje.region],
    ['Afiliación', personaje.affiliation],
    ['Cumpleaños', personaje.birthday],
    ['Constelación', personaje.constellation],
    ['Voz (inglés)', personaje.cv?.english],
    ['Voz (japonés)', personaje.cv?.japanese],
  ].filter(([, valor]) => valor)

  return (
    <div className="detalle-pagina">
      <NavLink to="/explorar" className="detalle__volver">← Volver a explorar</NavLink>

      <article
        className={`detalle detalle--${(personaje.elementText ?? '').toLowerCase()}`}
      >
        <div className="detalle__imagen">
          {imagenFallida || !resumen.imagen ? (
            <span className="detalle__sin-imagen" aria-hidden="true">
              {personaje.name[0]}
            </span>
          ) : (
            <img
              src={resumen.imagen}
              alt={`Retrato de ${personaje.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImagenFallida(true)}
            />
          )}
        </div>

        <div className="detalle__contenido">
          <h1 className="detalle__nombre">{personaje.name}</h1>
          {personaje.title && <p className="detalle__titulo">{personaje.title}</p>}

          <p className="detalle__rareza" aria-label={`${estrellas} estrellas`}>
            {'★'.repeat(estrellas)}
          </p>

          {personaje.description && (
            <p className="detalle__descripcion">{personaje.description}</p>
          )}

          <dl className="detalle__datos">
            {datos.map(([etiqueta, valor]) => (
              <div key={etiqueta} className="detalle__dato">
                <dt>{etiqueta}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>

          <div className="detalle__acciones">
            <button
              type="button"
              className={`detalle__boton ${esFavorito ? 'detalle__boton--activo' : ''}`}
              onClick={() => onToggleFavorito(resumen)}
              aria-pressed={esFavorito}
            >
              <span aria-hidden="true">{esFavorito ? '★' : '☆'}</span>{' '}
              {esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>

            {personaje.url?.fandom && (
              <a
                href={personaje.url.fandom}
                target="_blank"
                rel="noopener noreferrer"
                className="detalle__boton detalle__boton--secundario"
              >
                Ver en la wiki
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default Detalle