import './Cargando.css'

function Cargando({ mensaje = 'Cargando datos…' }) {
  return (
    <div className="cargando" role="status" aria-live="polite">
      <span className="cargando__spinner" aria-hidden="true" />
      <p className="cargando__mensaje">{mensaje}</p>
    </div>
  )
}

export default Cargando