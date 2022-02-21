import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import style from "./Favorites.module.css";

function Favorites({ favorites, setFavorites, pokemons, setPokemons }) {
  return (
    <div className={style.Favorites}>
      <Navbar />
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
            pokemons={pokemons}
            setPokemons={setPokemons}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
