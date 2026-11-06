import './Inicio.css'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import ModalNovedades from '../components/ModalNovedades'
import { useToast } from '../contexto/ToastContext'

function Inicio() {
  const [modalAbierto, setModalAbierto] = useState(false)
  const { mostrarToast } = useToast()

  useEffect(() => {
    const yaVisto = sessionStorage.getItem('novedades-visto')
    if (yaVisto) return

    const temporizador = setTimeout(() => setModalAbierto(true), 1500)
    return () => clearTimeout(temporizador)
  }, [])

  function cerrar() {
    setModalAbierto(false)
    sessionStorage.setItem('novedades-visto', 'true')
  }

  function suscribir(aceptaSocios) {
    // Aquí iría la llamada real a tu API o servicio de correo
    console.log('Suscrito. ¿Acepta ofertas de socios?', aceptaSocios)
    cerrar()
    mostrarToast('¡Listo! Te avisaremos de las novedades.', 'exito')
  }

  function rechazar() {
    cerrar()
    mostrarToast('Bueno, no te mandaremos nada.', 'info')
  }

  return (
    <section className="inicio">
      <h1 className="inicio__titulo">
        Descubre a los habitantes de <span className="inicio__titulo-destacado">Teyvat</span>
      </h1>
      <p className="inicio__subtitulo">
        Todos tus personajes de Genshin Impact favoritos en un solo lugar.
        Explora, guarda y comparte tus personajes favoritos.
      </p>

      <NavLink to="/explorar" className="inicio__boton">
        Ver todos los personajes
      </NavLink>

      <ModalNovedades
        abierto={modalAbierto}
        onSuscribir={suscribir}
        onRechazar={rechazar}
        onCerrar={cerrar}
      />
    </section>
  )
}

export default Inicio