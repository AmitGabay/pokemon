import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import style from "./Home.module.css";
import { getPokemon } from "../../utils";

function Home({ pokemons, favorites, setFavorites }) {
  const [fetchedPokemons, setFetchedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    pokemons.forEach((pokemon) =>
      getPokemon(pokemon).then((pokemon) =>
        setFetchedPokemons((prev) => [...prev, pokemon])
      )
    );
  }, [pokemons]);

  useEffect(() => {
    if (fetchedPokemons.length === pokemons.length) {
      setIsLoading(false);
    }
  }, [fetchedPokemons]);

  return (
    <div className={style.Home}>
      {isLoading ? (
        <Spinner />
      ) : (
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
                id={pokemon.id}
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
      )}
    </div>
  );
}

export default Home;
