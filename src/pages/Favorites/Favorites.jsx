import { useState, useEffect } from "react";

import { getPokemon } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";
import style from "./Favorites.module.css";

const Favorites = ({ favorites, setFavorites, userLoggedIn }) => {
  const [fetchedPokemons, setFetchedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      const fetched = await Promise.all(
        favorites.map(({ id }) => getPokemon(id))
      );

      setFetchedPokemons(fetched);
      setIsLoading(false);
    };

    if (favorites.length) getFavorites();
    else setFetchedPokemons([]);
  }, [favorites]);

  if (isLoading && favorites.length > 0) return <Spinner />;

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
            userLoggedIn={userLoggedIn}
          />
        ))}
    </div>
  );
};

export default Favorites;
