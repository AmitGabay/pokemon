import style from "./Navbar.module.css";
import pokeball from "../../assets/pokeball.png";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className={style.navbar}>
      <img src={pokeball} className={style.icon} alt="pokeball"></img>
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
    </nav>
  );
};

export default Navbar;
