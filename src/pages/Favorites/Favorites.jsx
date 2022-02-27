import { useState, useEffect } from "react";
import { getPokemon } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";
import style from "./Favorites.module.css";

function Favorites({ favorites, setFavorites }) {
  const [fetchedPokemons, setFetchedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    favorites.forEach((pokemon) =>
      getPokemon(pokemon).then((pokemon) =>
        setFetchedPokemons((prev) => [...prev, pokemon])
      )
    );
  }, [favorites]);

  useEffect(() => {
    if (fetchedPokemons.length === favorites.length || favorites.length === 0) {
      setIsLoading(false);
    }
  }, [fetchedPokemons, favorites]);

  function refreshFavorites() {
    setFetchedPokemons([]);
    setIsLoading(true);
  }
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
}

export default Favorites;
