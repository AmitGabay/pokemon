import style from "./Navbar.module.css";
import pokeball1 from "../../assets/pokeball1.png";
import { NavLink } from "react-router-dom";

const Navbar = ({ userLoggedIn, logout }) => {
  return (
    <nav className={style.navbar}>
      <img src={pokeball1} className={style.icon} alt="pokeball"></img>
      <NavLink
        to="/"
        exact
        className={style.brandName}
        activeClassName={style.selected}
      >
        Pokémon
      </NavLink>
      <NavLink
        to="/favorites"
        className={style.brandName}
        activeClassName={style.selected}
      >
        My Pokémons
      </NavLink>
      {userLoggedIn && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
