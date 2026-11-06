export interface Opcion {
  valor: string
  texto: string
}

interface Props {
  id: string
  etiqueta: string
  valor: string
  opciones: Opcion[]
  onChange: (valor: string) => void
}

function FiltroSelect({ id, etiqueta, valor, opciones, onChange }: Props) {
  return (
    <label htmlFor={id} className="explorar__label">
      {etiqueta}
      <select id={id} value={valor} onChange={(e) => onChange(e.target.value)}>
        {opciones.map((op) => (
          <option key={op.valor} value={op.valor}>
            {op.texto}
          </option>
        ))}
      </select>
    </label>
  )
}

export default FiltroSelect