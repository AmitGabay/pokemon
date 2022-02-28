import { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./Search.module.css";

const Search = ({ favorites }) => {
  const [pokemon, setPokemon] = useState("");
  const history = useHistory();

  function pokemonName(event) {
    setPokemon(event.target.value);
  }

  function pokemonSearch(event) {
    event.preventDefault();
    setPokemon([pokemon.toLowerCase()]);
    favorites.find(
      (favorite) => pokemon === favorite.name || pokemon === favorite.id
    )
      ? history.push(`/favorites/${pokemon}`)
      : history.push(`/pokemon/${pokemon}`);

    setTimeout(() => {
      setPokemon("");
    }, 300);
  }

  return (
    <form onSubmit={pokemonSearch} className={style.container}>
      <input
        type="search"
        placeholder="Find a Pokemon"
        value={pokemon}
        className={style.search}
        onChange={pokemonName}
      ></input>
    </form>
  );
};

export default Search;
