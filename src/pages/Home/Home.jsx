import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import style from "./Home.module.css";
import { getPokemon } from "../../utils";

function Home({ pokemons, favorites, setFavorites, resetArray }) {
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

  function newPokemon() {
    setFetchedPokemons([]);
    resetArray();
    setIsLoading(true);
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
}

export default Home;
