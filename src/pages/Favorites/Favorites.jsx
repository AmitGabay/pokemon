import Card from "../../components/Card/Card";
import style from "./Favorites.module.css";

function Favorites({ favorites, setFavorites }) {
  return (
    <div className={style.cards}>
      {favorites.map((pokemon) => (
        <Card
          key={pokemon.name}
          name={pokemon.name}
          type={pokemon.type}
          img={pokemon.img}
          ability={pokemon.ability}
          evolve={pokemon.evolve}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  );
}

export default Favorites;
