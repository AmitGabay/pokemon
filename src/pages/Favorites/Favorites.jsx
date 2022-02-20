import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import style from "./Favorites.module.css";

function Favorites({ favorites, setFavorites }) {
  return (
    <div className={style.Favorites}>
      <Navbar />
      <div className={style.cards}>
        {favorites.map((favorite) => (
          <Card
            pokemon={favorite}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
