import './Paginacion.css'

interface Props {
  pagina: number
  totalPaginas: number
  onCambiar: (pagina: number) => void
}

function Paginacion({ pagina, totalPaginas, onCambiar }: Props) {
  if (totalPaginas <= 1) return null

  const numeros = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  return (
    <nav className="paginacion" aria-label="Paginación de personajes">
      <button
        type="button"
        className="paginacion__boton"
        onClick={() => onCambiar(pagina - 1)}
        disabled={pagina === 1}
      >
        ← Anterior
      </button>

      <ul className="paginacion__lista">
        {numeros.map((n) => (
          <li key={n}>
            <button
              type="button"
              className={`paginacion__numero ${n === pagina ? 'paginacion__numero--activo' : ''}`}
              onClick={() => onCambiar(n)}
              aria-label={`Ir a la página ${n}`}
              aria-current={n === pagina ? 'page' : undefined}
            >
              {n}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="paginacion__boton"
        onClick={() => onCambiar(pagina + 1)}
        disabled={pagina === totalPaginas}
      >
        Siguiente →
      </button>
    </nav>
  )
}

export default Paginacion