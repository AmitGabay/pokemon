import { NavLink } from "react-router-dom";

import pokeball1 from "../../assets/pokeball1.png";
import style from "./Navbar.module.css";

const Navbar = ({ userLoggedIn, logout }) => {
  return (
    <nav className={style.navbar}>
      <img src={pokeball1} className={style.icon} alt="pokeball"></img>

      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `${style.brandName} ${isActive ? style.selected : ""}`
        }
      >
        Pokémon
      </NavLink>

      <NavLink
        to={"/favorites"}
        className={({ isActive }) =>
          `${style.brandName} ${isActive ? style.selected : ""}`
        }
      >
        My Pokémon
      </NavLink>

      {userLoggedIn ? (
        <button className={style.btn} onClick={logout}>
          Logout
        </button>
      ) : (
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            `${style.login} ${isActive ? style.disappear : ""}`
          }
        >
          <button className={style.btn}>Login</button>
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
