import { useState } from "react";
import style from "./Search.module.css";

const Search = ({ setPokemons }) => {
  const [pokemon, setPokemon] = useState("");

  function pokemonName(event) {
    setPokemon(event.target.value);
  }

  function pokemonSearch(event) {
    event.preventDefault();
    setPokemons([pokemon.toLowerCase()]);
  }

  return (
    <form onSubmit={pokemonSearch}>
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
