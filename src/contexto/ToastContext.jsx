import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import ContenedorToast from '../components/ContenedorToast'

const ToastContext = createContext(null)
const DURACION = 4000 // ms antes del auto-dismiss
const MAXIMO_VISIBLES = 3

let siguienteId = 0

export function ProveedorToast({ children }) {
  const [toasts, setToasts] = useState([])
  const temporizadores = useRef(new Map())

  const cerrarToast = useCallback((id) => {
    clearTimeout(temporizadores.current.get(id))
    temporizadores.current.delete(id)
    setToasts((actuales) => actuales.filter((t) => t.id !== id))
  }, [])

  // tipo: 'exito' | 'error' | 'info'
  const mostrarToast = useCallback(
    (mensaje, tipo = 'info', duracion = DURACION) => {
      const id = ++siguienteId
      setToasts((actuales) => [...actuales.slice(-(MAXIMO_VISIBLES - 1)), { id, mensaje, tipo }])
      temporizadores.current.set(id, setTimeout(() => cerrarToast(id), duracion))
    },
    [cerrarToast]
  )

  // Al desmontar el proveedor se limpian los temporizadores pendientes
  useEffect(() => {
    const mapa = temporizadores.current
    return () => mapa.forEach((temporizador) => clearTimeout(temporizador))
  }, [])

  const valor = useMemo(() => ({ mostrarToast, cerrarToast }), [mostrarToast, cerrarToast])

  return (
    <ToastContext.Provider value={valor}>
      {children}
      <ContenedorToast toasts={toasts} onCerrar={cerrarToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const contexto = useContext(ToastContext)
  if (!contexto) throw new Error('useToast debe usarse dentro de <ProveedorToast>')
  return contexto
}