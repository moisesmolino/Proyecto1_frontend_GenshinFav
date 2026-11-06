import './TarjetaPersonaje.css'
import { useState } from 'react'
import { NavLink } from 'react-router'
import type { Personaje } from '../tipos'

interface Props {
  personaje: Personaje
  esFavorito: boolean
  onToggleFavorito: (personaje: Personaje) => void
}

function TarjetaPersonaje({ personaje, esFavorito, onToggleFavorito }: Props) {
  const [imagenFallida, setImagenFallida] = useState(false)
  const estrellas = personaje.rarity.split('_')[0] // "4_star" -> "4"

  return (
    <article
      className={`tarjeta-personaje tarjeta-personaje--${personaje.vision.toLowerCase()}`}
    >
      <div className="tarjeta-personaje__imagen">
        {imagenFallida || !personaje.imagen ? (
          <span className="tarjeta-personaje__sin-imagen" aria-hidden="true">
            {personaje.name[0]}
          </span>
        ) : (
          <img
            src={personaje.imagen}
            alt={`Retrato de ${personaje.name}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImagenFallida(true)}
          />
        )}
      </div>

      <button
        type="button"
        className={`tarjeta-personaje__favorito ${esFavorito ? 'tarjeta-personaje__favorito--activo' : ''}`}
        onClick={() => onToggleFavorito(personaje)}
        aria-pressed={esFavorito}
        aria-label={`Favorito: ${personaje.name}`}
      >
        <span aria-hidden="true">{esFavorito ? '★' : '☆'}</span>
      </button>

      <div className="tarjeta-personaje__cuerpo">
        <span className="tarjeta-personaje__vision">{personaje.vision}</span>

        <h2 className="tarjeta-personaje__nombre">
          <NavLink to={`/explorar/${personaje.id}`}>{personaje.name}</NavLink>
        </h2>

        <p className="tarjeta-personaje__dato">
          <span className="tarjeta-personaje__etiqueta">Arma</span> {personaje.weapon}
        </p>
        <p className="tarjeta-personaje__dato">
          <span className="tarjeta-personaje__etiqueta">Rareza</span>{' '}
          <span role="img" aria-label={`${estrellas} estrellas`}>{'★'.repeat(Number(estrellas))}</span>
        </p>
      </div>
    </article>
  )
}

export default TarjetaPersonaje