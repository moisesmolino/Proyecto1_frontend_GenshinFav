function CampoFormulario({
  id,
  etiqueta,
  valor,
  error,
  onChange,
  onBlur,
  tipo = 'text',
  multilinea = false,
  placeholder,
  autoComplete,
}) {
  const idError = `${id}-error`
  const propiedades = {
    id,
    name: id,
    value: valor,
    onChange: (e) => onChange(e.target.value),
    onBlur,
    placeholder,
    autoComplete,
    'aria-required': 'true',
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? idError : undefined,
    className: `campo__control ${error ? 'campo__control--error' : ''}`,
  }

  return (
    <div className="campo">
      <label htmlFor={id} className="campo__etiqueta">{etiqueta}</label>

      {multilinea ? (
        <textarea rows={5} {...propiedades} />
      ) : (
        <input type={tipo} {...propiedades} />
      )}

      {error && (
        <p id={idError} className="campo__error" role="alert">{error}</p>
      )}
    </div>
  )
}

export default CampoFormulario