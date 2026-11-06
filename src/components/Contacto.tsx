import './Contacto.css'
import { useState, type FormEvent } from 'react'
import CampoFormulario from './CampoFormulario'
import ModalConfirmacion from './ModalConfirmacion'
import { useToast } from '../contexto/ToastContext'

interface Formulario {
  nombre: string
  email: string
  mensaje: string
}

type Campo = keyof Formulario
type Errores = Partial<Record<Campo, string>>

const VACIO: Formulario = { nombre: '', email: '', mensaje: '' }
const SIN_TOCAR: Record<Campo, boolean> = { nombre: false, email: false, mensaje: false }
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validar({ nombre, email, mensaje }: Formulario): Errores {
  const errores: Errores = {}
  if (nombre.trim().length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres.'
  }
  if (!REGEX_EMAIL.test(email.trim())) {
    errores.email = 'Ingresa un email válido (debe contener @ y .).'
  }
  if (mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  }
  return errores
}

function Contacto() {
  const [form, setForm] = useState<Formulario>(VACIO)
  const [tocados, setTocados] = useState<Record<Campo, boolean>>(SIN_TOCAR)
  const [confirmando, setConfirmando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const errores = validar(form)
  const esValido = Object.keys(errores).length === 0

  // Solo se muestra el error de un campo después de que la persona lo toca
  const errorVisible = (campo: Campo) => (tocados[campo] ? errores[campo] : undefined)

  const cambiar = (campo: Campo) => (valor: string) => setForm({ ...form, [campo]: valor })
  const tocar = (campo: Campo) => () => setTocados({ ...tocados, [campo]: true })
  const { mostrarToast } = useToast()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!esValido) {
      setTocados({ nombre: true, email: true, mensaje: true })
      mostrarToast('Revisa los campos marcados antes de enviar.', 'error')
      return
    }
    setConfirmando(true)
  }

  function confirmarEnvio() {
    setConfirmando(false)
    setEnviado(true)
    setForm(VACIO)
    setTocados(SIN_TOCAR)
    mostrarToast('Mensaje enviado correctamente.', 'exito')
  }

  if (enviado) {
    return (
      <section className="contacto">
        <div className="contacto__exito" role="status">
          <p className="contacto__exito-icono" aria-hidden="true">✓</p>
          <h1 className="contacto__titulo">¡Gracias por tu sugerencia!</h1>
          <p className="contacto__texto">La leeremos con mucho gusto.</p>
          <button
            type="button"
            className="contacto__boton"
            onClick={() => setEnviado(false)}
          >
            Enviar otra sugerencia
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="contacto">
      <h1 className="contacto__titulo">Contacto</h1>
      <p className="contacto__texto">
        ¿Tienes preguntas o sugerencias? Envíanos un mensaje.
      </p>

      <form className="contacto__formulario" onSubmit={handleSubmit} noValidate>
        <CampoFormulario
          id="nombre"
          etiqueta="Nombre"
          valor={form.nombre}
          error={errorVisible('nombre')}
          onChange={cambiar('nombre')}
          onBlur={tocar('nombre')}
          autoComplete="name"
        />

        <CampoFormulario
          id="email"
          etiqueta="Email"
          tipo="email"
          valor={form.email}
          error={errorVisible('email')}
          onChange={cambiar('email')}
          onBlur={tocar('email')}
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
        />

        <CampoFormulario
          id="mensaje"
          etiqueta="Mensaje"
          multilinea
          valor={form.mensaje}
          error={errorVisible('mensaje')}
          onChange={cambiar('mensaje')}
          onBlur={tocar('mensaje')}
          placeholder="Escribe tu sugerencia aquí…"
        />

        <button type="submit" className="contacto__boton">
          Enviar mensaje
        </button>
      </form>

      <ModalConfirmacion
        abierto={confirmando}
        titulo="¿Enviar mensaje?"
        mensaje="Revisaremos tu sugerencia. ¿Quieres enviarla ahora?"
        textoConfirmar="Enviar"
        onConfirmar={confirmarEnvio}
        onCancelar={() => setConfirmando(false)}
      />
    </section>
  )
}

export default Contacto