import { NavLink } from 'react-router';

function Navegacion({ totalFavoritos }: { totalFavoritos: number }) {
  return (
    <header className="navegacion">
      <span className="logo">⛩️ Genshin Fav</span>
      <nav aria-label="Principal">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/explorar">Explorar</NavLink>
        <NavLink to="/favoritos">
          Favoritos
          {totalFavoritos > 0 && (
            <>
              <span className="contador" aria-hidden="true">{totalFavoritos}</span>
              <span className="visually-hidden"> ({totalFavoritos} guardados)</span>
            </>
          )}
        </NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
      </nav>
    </header>
  );
}

export default Navegacion;
