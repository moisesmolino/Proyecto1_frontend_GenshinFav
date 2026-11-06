import './ModalConfirmacion.css'
import { useEffect, useRef, type MouseEvent } from 'react'

interface Props {
  abierto: boolean
  titulo: string
  mensaje: string
  textoConfirmar?: string
  textoCancelar?: string
  onConfirmar: () => void
  onCancelar: () => void
}

function ModalConfirmacion({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  onConfirmar,
  onCancelar,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Abre o cierra el <dialog> nativo según la prop `abierto`
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (abierto && !dialog.open) dialog.showModal()
    if (!abierto && dialog.open) dialog.close()
  }, [abierto])

  // Clic en el fondo oscuro (el propio <dialog>) = cancelar
  function alHacerClic(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onCancelar()
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="modal-titulo"
      aria-describedby="modal-mensaje"
      onClose={onCancelar} // también se dispara con la tecla Esc
      onClick={alHacerClic}
    >
      <div className="modal__contenido">
        <svg
          className="modal__icono"
          viewBox="0 0 24 24"
          width="48"
          height="48"
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

        <h2 id="modal-titulo" className="modal__titulo">{titulo}</h2>
        <p id="modal-mensaje" className="modal__mensaje">{mensaje}</p>

        <div className="modal__acciones">
          <button type="button" className="modal__boton modal__boton--cancelar" onClick={onCancelar}>
            {textoCancelar}
          </button>
          <button type="button" className="modal__boton modal__boton--peligro" onClick={onConfirmar}>
            {textoConfirmar}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ModalConfirmacion