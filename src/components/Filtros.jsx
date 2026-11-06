function FiltroSelect({ id, etiqueta, valor, opciones, onChange }) {
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