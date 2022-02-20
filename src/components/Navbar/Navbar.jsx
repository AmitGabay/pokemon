import style from "./Navbar.module.css";
import pokeball from "../../assets/pokeball.png";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className={style.navbar}>
      <img src={pokeball} className={style.icon} alt="pokeball"></img>
      <NavLink to="/" className={style.brandName}>
        Pokémon
      </NavLink>
      <NavLink to="/favorites" className={style.brandName}>
        My Pokémons
      </NavLink>
    </nav>
  );
};

export default Navbar;
