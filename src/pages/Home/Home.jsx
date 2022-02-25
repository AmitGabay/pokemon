import { useState, useEffect } from "react";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import style from "./Home.module.css";
import { getPokemon } from "../../utils";

function Home({ pokemons, setPokemons, favorites, setFavorites }) {
  const [fetchedPokemons, setFetchedPokemons] = useState([]);

  useEffect(() => {
    pokemons.forEach((pokemon) =>
      getPokemon(pokemon).then((pokemon) =>
        setFetchedPokemons((prev) => [...prev, pokemon])
      )
    );
  }, [pokemons]);

  return (
    <div className={style.Home}>
      <Search
        setPokemons={setPokemons}
        setFetchedPokemons={setFetchedPokemons}
      />
      <div className={style.cards}>
        {fetchedPokemons
          .sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else {
              return 1;
            }
          })
          .map((pokemon) => (
            <Card
              key={pokemon.name}
              name={pokemon.name}
              type={pokemon.type}
              img={pokemon.img}
              ability={pokemon.ability}
              evolve={pokemon.evolve}
              legendary={pokemon.legendary}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
