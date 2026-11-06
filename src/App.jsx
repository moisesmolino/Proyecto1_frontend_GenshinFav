import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Navegacion from './components/Navegacion'
import Footer from './components/PiePagina'
import Inicio from './paginas/Inicio'
import Explorar from './paginas/Explorar'
import Detalle from './paginas/Detalle'
import Favoritos from './paginas/Favoritos'
import Contacto from './components/Contacto'
import NoEncontrada from './paginas/NoEncontrada'
import { useToast } from './contexto/ToastContext'

const CLAVE_FAVORITOS = 'favoritos-personajes'

function leerFavoritos() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS) || '[]')
    return Array.isArray(guardados) ? guardados : []
  } catch {
    return []
  }
}

function App() {
  const [favoritos, setFavoritos] = useState(leerFavoritos)

  useEffect(() => {
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos))
  }, [favoritos])

  function alternarFavorito(personaje) {
    setFavoritos((actuales) =>
      actuales.some((f) => f.id === personaje.id)
        ? actuales.filter((f) => f.id !== personaje.id)
        : [...actuales, personaje]
    )
  }

  const { mostrarToast } = useToast()

  function alternarFavorito(personaje) {
    const yaEsFavorito = favoritos.some((f) => f.id === personaje.id)

    setFavoritos((actuales) =>
      yaEsFavorito
        ? actuales.filter((f) => f.id !== personaje.id)
        : [...actuales, personaje]
    )

    // El toast va fuera de setFavoritos: la función que recibe debe ser pura
    mostrarToast(
      yaEsFavorito
        ? `${personaje.name} quitado de favoritos`
        : `${personaje.name} agregado a favoritos`,
      yaEsFavorito ? 'info' : 'exito'
    )
  }

  return (
    <div className="app">
      <Navegacion totalFavoritos={favoritos.length} />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/explorar"
            element={<Explorar favoritos={favoritos} onToggleFavorito={alternarFavorito} />}
          />
          <Route
            path="/explorar/:id"
            element={<Detalle favoritos={favoritos} onToggleFavorito={alternarFavorito} />}
          />
          <Route
            path="/favoritos"
            element={<Favoritos favoritos={favoritos} onToggleFavorito={alternarFavorito} />}
          />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App