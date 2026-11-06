import './NoEncontrada.css'
import { NavLink } from 'react-router'

function NoEncontrada() {
  return (
    <section className="no-encontrada">
      <p className="no-encontrada__codigo" aria-hidden="true">404</p>
      <h1 className="no-encontrada__titulo">Página no encontrada</h1>
      <p className="no-encontrada__texto">
        La ruta que buscas no existe en esta aplicación.
      </p>

      <div className="no-encontrada__acciones">
        <NavLink to="/" className="no-encontrada__boton">
          Volver al inicio
        </NavLink>
        <NavLink
          to="/explorar"
          className="no-encontrada__boton no-encontrada__boton--secundario"
        >
          Explorar personajes
        </NavLink>
      </div>
    </section>
  )
}

export default NoEncontrada