import './Cargando.css'

function EsqueletoGrilla({ cantidad = 12 }) {
  return (
    <div role="status" aria-live="polite">
      <span className="solo-lectores">Cargando personajes…</span>

      <div className="explorar__grilla" aria-hidden="true">
        {Array.from({ length: cantidad }, (_, i) => (
          <div key={i} className="esqueleto">
            <div className="esqueleto__imagen esqueleto__brillo" />
            <div className="esqueleto__cuerpo">
              <div className="esqueleto__linea esqueleto__linea--corta esqueleto__brillo" />
              <div className="esqueleto__linea esqueleto__linea--titulo esqueleto__brillo" />
              <div className="esqueleto__linea esqueleto__brillo" />
              <div className="esqueleto__linea esqueleto__brillo" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EsqueletoGrilla