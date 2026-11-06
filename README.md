# ⛩️ Genshin Fav

Aplicación web para explorar los personajes de **Genshin Impact**, filtrarlos, ver su ficha completa y guardar tus favoritos. Hecha con **Vite, React 19 y React Router 7** como Proyecto Individual 1 de Frontend.

Los datos vienen de la API pública [genshin-db-api](https://genshin-db-api.vercel.app/), y los favoritos se guardan en el navegador (`localStorage`).

## Correr el proyecto

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173). Otros comandos:

```bash
npm run build     # genera la versión de producción
npm run preview   # sirve la versión de producción
```

## Funcionalidades

- **Inicio:** presentación de la app y modal de novedades (ver nota sobre *dark patterns*).
- **Explorar:** búsqueda por nombre y filtros por elemento, arma, rareza y nación. Los filtros y la página viven en la URL, así que se pueden compartir. Paginación de 12 en 12.
- **Detalle:** ficha completa de cada personaje (descripción, constelación, cumpleaños, voces) con enlace a la wiki.
- **Favoritos:** lista persistente, con orden por nombre, rareza o elemento y confirmación antes de quitar.
- **Contacto:** formulario con validación en vivo y confirmación antes de enviar.
- **Toasts:** avisos al agregar o quitar favoritos, al enviar el formulario y al responder en el modal.
- **Estados de carga y error:** esqueleto de carga, mensaje de error con botón de reintento y página 404.

## Estructura

```
src/
├── main.jsx                 BrowserRouter + ProveedorToast
├── App.jsx                  rutas y estado de favoritos
├── api.js                   peticiones a la API y normalización de datos
├── index.css                estilos globales y clase .visually-hidden
├── contexto/
│   └── ToastContext.jsx     proveedor y hook useToast
├── components/
│   ├── Navegacion.jsx       cabecera y menú principal
│   ├── PiePagina.jsx
│   ├── TarjetaPersonaje.jsx
│   ├── Filtros.jsx          select con etiqueta (FiltroSelect)
│   ├── Paginacion.jsx
│   ├── CampoFormulario.jsx
│   ├── Contacto.jsx
│   ├── ModalConfirmacion.jsx
│   ├── ModalNovedades.jsx
│   ├── ContenedorToast.jsx
│   ├── Cargando.jsx
│   ├── EsqueletoGrilla.jsx
│   └── MensajeError.jsx
└── paginas/
    ├── Inicio.jsx
    ├── Explorar.jsx
    ├── Detalle.jsx
    ├── Favoritos.jsx
    └── NoEncontrada.jsx
```

## Accesibilidad

| Requisito | Cómo se cumple |
| --- | --- |
| **`alt`** | Las imágenes de personajes tienen un texto descriptivo (`Retrato de {nombre}`). Cuando la imagen falla se muestra una inicial decorativa con `aria-hidden`. Los íconos SVG decorativos también van ocultos a los lectores de pantalla. |
| **`role`** | `role="search"` en los filtros, `role="status"` en cargas y en el anuncio de resultados, `role="alert"` en errores, `role="list"` en la grilla de resultados y `role="img"` en las estrellas de rareza. |
| **`aria-label`** | En el `<nav>` principal y el de paginación, en la región de búsqueda, en los botones de favorito (`Favorito: {nombre}`), en el botón de cerrar toast y en los botones de página. |
| **`htmlFor`** | Cada campo tiene su `<label htmlFor>` asociado al `id` del control: buscador, filtros, selector de orden y campos del formulario de contacto. La casilla del modal está envuelta en su `<label>`. |
| **HTML semántico** | `<header>`, `<nav>`, `<main>` (único) y `<footer>`, `<section>` por página, `<article>` por personaje, `<ul>/<li>` para listas, `<dl>` para los datos del personaje y `<dialog>` nativo para los modales. Un `<h1>` por página con jerarquía ordenada (`h1` → `h2`). |

Otros detalles de accesibilidad:

- `<html lang="es">` y título de documento definidos.
- `aria-pressed` en los botones de favorito, `aria-current` en el menú y la paginación.
- Errores del formulario asociados con `aria-invalid` y `aria-describedby`, y campos marcados con `aria-required`.
- Los modales usan `<dialog>` (foco atrapado, cierre con `Esc`) con `aria-labelledby` y `aria-describedby`.
- Al cambiar de página o limpiar filtros en Explorar, el foco se mueve a un elemento visible.
- Los resultados filtrados se anuncian en una región `aria-live` oculta visualmente.
- No se elimina el contorno de foco en ningún estilo.

## Nota sobre *dark patterns*

`ModalNovedades` usa **a propósito** tres patrones oscuros como ejercicio del proyecto: *confirmshaming* en el botón de rechazar, asimetría visual entre aceptar y rechazar, y casilla de socios premarcada. Está explicado en el comentario del archivo. En un producto real no sería aceptable. El modal sí se puede cerrar con `Esc` y con clic en el fondo, y el texto de rechazo se mantiene legible.

## Tecnologías

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- [genshin-db-api](https://genshin-db-api.vercel.app/)

## Autor

Moisés Vega — Proyecto Individual 1, Frontend.