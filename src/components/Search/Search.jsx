import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import style from "./Search.module.css";

const Search = ({ favorites }) => {
  const [pokemon, setPokemon] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const pokemonName = (event) => {
    setPokemon(event.target.value);
  };

  const pokemonSearch = (event) => {
    event.preventDefault();

    if (location.pathname === "/favorites") {
      favorites.find(
        (favorite) =>
          pokemon.toLowerCase() === favorite.name || +pokemon === favorite.id
      )
        ? navigate(`/favorites/${pokemon.toLowerCase()}`)
        : alert(
            `You have not catched ${pokemon[0].toUpperCase()}${pokemon.slice(
              1
            )} yet`
          );
    } else {
      navigate(`/pokemon/${pokemon.toLowerCase()}`);
    }

    setTimeout(() => setPokemon(""), 300);
  };

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
