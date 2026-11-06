import './Explorar.css'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { obtenerPersonajes } from '../api'
import TarjetaPersonaje from '../components/TarjetaPersonaje'
import FiltroSelect from '../components/Filtros'
import Paginacion from '../components/Paginacion'
import EsqueletoGrilla from '../components/EsqueletoGrilla'
import MensajeError from '../components/MensajeError'

const POR_PAGINA = 12

const textoRareza = (rarity) => `${rarity.split('_')[0]} ★`

function crearOpciones(personajes, campo, formatear = (v) => v) {
  const valores = [...new Set(personajes.map((p) => p[campo]))].sort()
  return [
    { valor: 'todas', texto: 'Todas' },
    ...valores.map((v) => ({ valor: v, texto: formatear(v) })),
  ]
}

function Explorar({ favoritos = [], onToggleFavorito }) {
  const [personajes, setPersonajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()

  const busquedaRef = useRef(null)
  const tituloRef = useRef(null)

  const busqueda = searchParams.get('q') ?? ''
  const vision = searchParams.get('vision') ?? 'todas'
  const arma = searchParams.get('arma') ?? 'todas'
  const rareza = searchParams.get('rareza') ?? 'todas'
  const nacion = searchParams.get('nacion') ?? 'todas'

  useEffect(() => {
    const controller = new AbortController()
    setCargando(true)
    setError(null)

    obtenerPersonajes(controller.signal)
      .then((datos) => {
        setPersonajes(datos)
        setCargando(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setCargando(false)
      })

    return () => controller.abort()
  }, [intento])

  const visibles = personajes.filter((p) => {
    const coincideNombre = p.name.toLowerCase().includes(busqueda.toLowerCase().trim())
    const coincideVision = vision === 'todas' || p.vision === vision
    const coincideArma = arma === 'todas' || p.weapon === arma
    const coincideRareza = rareza === 'todas' || p.rarity === rareza
    const coincideNacion = nacion === 'todas' || p.region === nacion
    return coincideNombre && coincideVision && coincideArma && coincideRareza && coincideNacion
  })

  const totalPaginas = Math.max(1, Math.ceil(visibles.length / POR_PAGINA))
  const pagina = Math.min(Math.max(Number(searchParams.get('pagina')) || 1, 1), totalPaginas)
  const inicio = (pagina - 1) * POR_PAGINA
  const paginados = visibles.slice(inicio, inicio + POR_PAGINA)

  const hayFiltros =
    busqueda !== '' ||
    vision !== 'todas' ||
    arma !== 'todas' ||
    rareza !== 'todas' ||
    nacion !== 'todas'

  function actualizarFiltro(clave, valor) {
    const nuevos = new URLSearchParams(searchParams)
    if (valor === '' || valor === 'todas') nuevos.delete(clave)
    else nuevos.set(clave, valor)
    nuevos.delete('pagina')
    setSearchParams(nuevos, { replace: true })
  }

  function cambiarPagina(n) {
    const nuevos = new URLSearchParams(searchParams)
    if (n === 1) nuevos.delete('pagina')
    else nuevos.set('pagina', n)
    setSearchParams(nuevos)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    tituloRef.current?.focus({ preventScroll: true })
  }

  function limpiarFiltros() {
    setSearchParams({}, { replace: true })
    busquedaRef.current?.focus()
  }

  const esFavorito = (id) => favoritos.some((f) => f.id === id)

  // Texto que anuncia el lector de pantalla (no se ve, no ocupa espacio)
  let anuncio = ''
  if (!cargando && !error) {
    anuncio =
      visibles.length === 0
        ? 'No hay personajes que coincidan con tu búsqueda.'
        : `Mostrando ${inicio + 1} a ${inicio + paginados.length} de ${visibles.length} resultados`
  }

  return (
    <section className="explorar">
      <h1 className="explorar__titulo" ref={tituloRef} tabIndex={-1}>
        Explorar personajes
      </h1>

      <div className="explorar__filtros" role="search" aria-label="Filtrar personajes">
        <label htmlFor="busqueda" className="explorar__label">
          Buscar personaje
          <input
            id="busqueda"
            ref={busquedaRef}
            type="search"
            placeholder="Ej: Amber"
            value={busqueda}
            onChange={(e) => actualizarFiltro('q', e.target.value)}
          />
        </label>

        <FiltroSelect
          id="vision"
          etiqueta="Elemento"
          valor={vision}
          opciones={crearOpciones(personajes, 'vision')}
          onChange={(v) => actualizarFiltro('vision', v)}
        />

        <FiltroSelect
          id="arma"
          etiqueta="Arma"
          valor={arma}
          opciones={crearOpciones(personajes, 'weapon')}
          onChange={(v) => actualizarFiltro('arma', v)}
        />

        <FiltroSelect
          id="rareza"
          etiqueta="Rareza"
          valor={rareza}
          opciones={crearOpciones(personajes, 'rarity', textoRareza)}
          onChange={(v) => actualizarFiltro('rareza', v)}
        />

        <FiltroSelect
          id="nacion"
          etiqueta="Nación"
          valor={nacion}
          opciones={crearOpciones(personajes, 'region')}
          onChange={(v) => actualizarFiltro('nacion', v)}
        />

        {hayFiltros && (
          <button type="button" className="explorar__limpiar" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Región viva oculta: siempre en el DOM, sin efecto en el layout */}
      <div className="visually-hidden" role="status" aria-live="polite">
        {anuncio}
      </div>

      {cargando && <EsqueletoGrilla />}

      {error && (
        <MensajeError
          mensaje={error}
          onReintentar={() => setIntento((n) => n + 1)}
        />
      )}

      {!cargando && !error && (
        <>
          {visibles.length === 0 ? (
            <p className="explorar__estado" aria-hidden="true">
              No hay personajes que coincidan con tu búsqueda.
            </p>
          ) : (
            <>
              <p className="explorar__conteo" aria-hidden="true">
                Mostrando {inicio + 1}–{inicio + paginados.length} de {visibles.length} resultados
              </p>

              <ul className="explorar__grilla" role="list">
                {paginados.map((personaje) => (
                  <li key={personaje.id} className="explorar__item">
                    <TarjetaPersonaje
                      personaje={personaje}
                      esFavorito={esFavorito(personaje.id)}
                      onToggleFavorito={onToggleFavorito}
                    />
                  </li>
                ))}
              </ul>

              <Paginacion
                pagina={pagina}
                totalPaginas={totalPaginas}
                onCambiar={cambiarPagina}
              />
            </>
          )}
        </>
      )}
    </section>
  )
}

export default Explorar