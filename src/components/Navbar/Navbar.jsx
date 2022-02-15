import style from "./Navbar.module.css";
import pokeball from "../../assets/pokeball.png";

const Navbar = (props) => {
  return (
    <nav className={style.navbar}>
      <img src={pokeball} className={style.icon} alt="pokeball"></img>
      <span className={style.brandName}>Pokémon</span>
    </nav>
  );
};

export default Navbar;
