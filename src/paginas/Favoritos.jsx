import './Favoritos.css'
import { useState } from 'react'
import { NavLink } from 'react-router'
import TarjetaPersonaje from '../components/TarjetaPersonaje'
import ModalConfirmacion from '../components/ModalConfirmacion'

const estrellas = (p) => Number(p.rarity.split('_')[0]) || 0

const ORDENES = {
  nombre: (a, b) => a.name.localeCompare(b.name),
  rareza: (a, b) => estrellas(b) - estrellas(a) || a.name.localeCompare(b.name),
  elemento: (a, b) => a.vision.localeCompare(b.vision) || a.name.localeCompare(b.name),
}

function Favoritos({ favoritos = [], onToggleFavorito }) {
  const [orden, setOrden] = useState('nombre')
  const [pendiente, setPendiente] = useState(null) // personaje que se quiere quitar

  const lista = [...favoritos].sort(ORDENES[orden])

  function confirmarQuitar() {
    onToggleFavorito(pendiente)
    setPendiente(null)
  }

  return (
    <section className="favoritos">
      <h1 className="favoritos__titulo">Mis favoritos</h1>
      <p className="favoritos__conteo">
        {favoritos.length} {favoritos.length === 1 ? 'personaje guardado' : 'personajes guardados'}
      </p>

      {favoritos.length === 0 ? (
        <div className="favoritos__vacio">
          <svg
            className="favoritos__vacio-icono"
            viewBox="0 0 24 24"
            width="64"
            height="64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="12 2 15.1 8.6 22 9.3 16.8 14 18.2 21 12 17.5 5.8 21 7.2 14 2 9.3 8.9 8.6 12 2" />
          </svg>
          <p>No tienes favoritos guardados.</p>
          <NavLink to="/explorar" className="favoritos__boton">
            Explorar y agregar algunos
          </NavLink>
        </div>
      ) : (
        <>
          <label htmlFor="orden" className="favoritos__orden">
            Ordenar por
            <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="nombre">Nombre</option>
              <option value="rareza">Rareza</option>
              <option value="elemento">Elemento</option>
            </select>
          </label>

          <div className="favoritos__grilla">
            {lista.map((personaje) => (
              <TarjetaPersonaje
                key={personaje.id}
                personaje={personaje}
                esFavorito
                onToggleFavorito={setPendiente} // no quita directo: abre el modal
              />
            ))}
          </div>
        </>
      )}

      <ModalConfirmacion
        abierto={pendiente !== null}
        titulo="¿Quitar de favoritos?"
        mensaje={
          pendiente
            ? `¿Seguro que quieres quitar a ${pendiente.name} de tus favoritos?`
            : ''
        }
        textoConfirmar="Quitar"
        onConfirmar={confirmarQuitar}
        onCancelar={() => setPendiente(null)}
      />
    </section>
  )
}

export default Favoritos