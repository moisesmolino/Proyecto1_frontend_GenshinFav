import './MensajeError.css'
import { NavLink } from 'react-router'

function MensajeError({
  titulo = 'No se pudo cargar la información',
  mensaje = 'Verifica tu conexión e intenta de nuevo.',
  onReintentar,
  mostrarInicio = false,
}) {
  return (
    <div className="mensaje-error" role="alert">
      <svg
        className="mensaje-error__icono"
        viewBox="0 0 24 24"
        width="56"
        height="56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>

      <h2 className="mensaje-error__titulo">{titulo}</h2>
      <p className="mensaje-error__texto">{mensaje}</p>

      <div className="mensaje-error__acciones">
        {onReintentar && (
          <button type="button" className="mensaje-error__boton" onClick={onReintentar}>
            Reintentar
          </button>
        )}
        {mostrarInicio && (
          <NavLink to="/" className="mensaje-error__enlace">
            Volver al inicio
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default MensajeError