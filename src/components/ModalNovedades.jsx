import './ModalNovedades.css'
import { useEffect, useRef, useState } from 'react'

/*
 * ⚠️ DARK PATTERN INTENCIONAL — ejercicio del Proyecto 01
 *
 * Este modal usa a propósito tres "patrones oscuros": trucos de diseño que empujan
 * a la persona a una decisión que quizá no tomaría con una interfaz neutra.
 *
 * 1. CONFIRMSHAMING: el botón de rechazar dice "No gracias, prefiero perderme las
 *    novedades". Está redactado para que decir que no resulte vergonzoso.
 * 2. ASIMETRÍA VISUAL: "aceptar" es un botón grande y de color, mientras que
 *    "rechazar" es un texto pequeño, sin relleno y de bajo énfasis. Ambas opciones
 *    existen, pero una es mucho más fácil de ver y de pulsar.
 * 3. CASILLA PREMARCADA: "ofertas de socios" viene activada por defecto (useState(true)).
 *    Quien acepta sin leer da un consentimiento extra que nunca pidió.
 *
 * Qué NO se hace: se dejó funcionando la tecla Esc y el cierre con clic en el fondo,
 * y el texto de rechazo mantiene un contraste legible. Un modal que impide cerrarse
 * ya sería una trampa real, y además rompería la accesibilidad.
 *
 * En un producto real nada de esto es aceptable: la versión ética pondría dos botones
 * del mismo peso, con textos neutros ("Suscribirme" / "Ahora no") y la casilla desmarcada.
 */
function ModalNovedades({ abierto, onSuscribir, onRechazar, onCerrar }) {
  const dialogRef = useRef(null)
  const [aceptaSocios, setAceptaSocios] = useState(true) // ← premarcada a propósito

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (abierto && !dialog.open) {
      setAceptaSocios(true)
      dialog.showModal()
    }
    if (!abierto && dialog.open) dialog.close()
  }, [abierto])

  function alHacerClic(e) {
    if (e.target === dialogRef.current) onCerrar()
  }

  return (
    <dialog
      ref={dialogRef}
      className="novedades"
      aria-labelledby="novedades-titulo"
      aria-describedby="novedades-texto"
      onClose={onCerrar} // se dispara con Esc o al cerrar desde código
      onClick={alHacerClic}
    >
      <div className="novedades__contenido">
        <h2 id="novedades-titulo" className="novedades__titulo">
          ¡No te pierdas nada del universo!
        </h2>
        <p id="novedades-texto" className="novedades__texto">
          Recibe en tu correo los personajes nuevos y las novedades de cada versión.
        </p>

        <label className="novedades__casilla">
          <input
            type="checkbox"
            checked={aceptaSocios}
            onChange={(e) => setAceptaSocios(e.target.checked)}
          />
          Quiero recibir también ofertas y promociones de nuestros socios
        </label>

        <button
          type="button"
          className="novedades__aceptar"
          onClick={() => onSuscribir(aceptaSocios)}
        >
          ¡Sí, quiero las novedades!
        </button>

        <button type="button" className="novedades__rechazar" onClick={onRechazar}>
          No gracias, prefiero perderme las novedades
        </button>
      </div>
    </dialog>
  )
}

export default ModalNovedades