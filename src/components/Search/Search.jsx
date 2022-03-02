import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import style from "./Search.module.css";

const Search = ({ favorites }) => {
  const [pokemon, setPokemon] = useState("");
  const history = useHistory();
  const location = useLocation();

  function pokemonName(event) {
    setPokemon(event.target.value);
  }

  function pokemonSearch(event) {
    event.preventDefault();
    if (location.pathname === "/favorites") {
      favorites.find(
        (favorite) =>
          pokemon.toLowerCase() === favorite.name || +pokemon === favorite.id
      )
        ? history.push(`/favorites/${pokemon.toLowerCase()}`)
        : alert(
            `You have not catched ${pokemon[0].toUpperCase()}${pokemon.slice(
              1
            )} yet`
          );
    } else {
      history.push(`/pokemon/${pokemon.toLowerCase()}`);
    }
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
