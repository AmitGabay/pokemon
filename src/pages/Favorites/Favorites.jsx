import { useState, useEffect } from "react";

import { getPokemon } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";
import style from "./Favorites.module.css";

function Favorites({ favorites, setFavorites }) {
  const [fetchedPokemons, setFetchedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    favorites.forEach(async (pokemon) => {
      const fetchedPokemon = await getPokemon(pokemon.id);

      setFetchedPokemons((prev) => [...prev, fetchedPokemon]);
    });
  }, [favorites]);

  useEffect(() => {
    if (!favorites.length || favorites.length === fetchedPokemons.length) {
      setIsLoading(false);
    }
  }, [fetchedPokemons, favorites]);

  const refreshFavorites = () => {
    setFetchedPokemons([]);
    setIsLoading(true);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={style.cards}>
      {fetchedPokemons
        .sort((a, b) => a.id - b.id)
        .map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            type={pokemon.type}
            img={pokemon.img}
            ability={pokemon.ability}
            evolve={pokemon.evolve}
            legendary={pokemon.legendary}
            favorites={favorites}
            setFavorites={setFavorites}
            refreshFavorites={refreshFavorites}
          />
        ))}
    </div>
  );
}

export default Favorites;
