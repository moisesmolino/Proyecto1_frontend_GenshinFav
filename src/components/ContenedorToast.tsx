import './ContenedorToast.css'

import type { Toast, TipoToast } from '../tipos'

const ICONOS: Record<TipoToast, string> = { exito: '✓', error: '!', info: 'i' }

interface Props {
  toasts: Toast[]
  onCerrar: (id: number) => void
}

function ContenedorToast({ toasts, onCerrar }: Props) {
  return (
    // La región aria-live ya existe en el DOM antes de que llegue un toast,
    // por eso los lectores de pantalla anuncian los mensajes nuevos.
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.tipo}`}
          role={toast.tipo === 'error' ? 'alert' : undefined}
        >
          <span className="toast__icono" aria-hidden="true">{ICONOS[toast.tipo]}</span>
          <p className="toast__mensaje">{toast.mensaje}</p>
          <button
            type="button"
            className="toast__cerrar"
            onClick={() => onCerrar(toast.id)}
            aria-label="Cerrar notificación"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default ContenedorToast