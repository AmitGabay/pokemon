import { useState, useEffect } from "react";

import { getPokemon } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";
import style from "./Home.module.css";

const Home = ({ pokemons, favorites, setFavorites, resetArray }) => {
  const [fetchedPokemons, setFetchedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    pokemons.forEach(async (pokemon) => {
      const val = await getPokemon(pokemon);
      setFetchedPokemons((prev) => [...prev, val]);
    });
  }, [pokemons]);

  useEffect(() => {
    if (fetchedPokemons.length === pokemons.length) {
      setIsLoading(false);
    }
  }, [fetchedPokemons]);

  const newPokemon = () => {
    setFetchedPokemons([]);
    resetArray();
    setIsLoading(true);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className={style.cards}>
        {fetchedPokemons
          .sort((a, b) => {
            if (a.id < b.id) {
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

      <div className={style.container}>
        <button className={style.btn} onClick={newPokemon}>
          New Pokemon!
        </button>
      </div>
    </>
  );
};

export default Home;
