import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import style from "./Home.module.css";

function Home({
  pokemon,
  setPokemon,
  favorites,
  setFavorites,
  pokemons,
  setPokemons,
}) {
  const [fetchedPokemons, setFetchedPokemons] = useState([]);

  useEffect(() => {
    pokemon.forEach((pokemon) =>
      axios({
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      }).then((res) => {
        const name = res.data.species.name;
        const type = res.data.types.map((type) => type.type.name);
        const img = res.data.sprites.front_default;
        const ability = res.data.abilities.map(
          (ability) => ability.ability.name
        );
        axios({
          method: "get",
          url: `${res.data.species.url}`,
        }).then((res) => {
          axios({
            method: "get",
            url: `${res.data.evolution_chain.url}`,
          }).then((res) => {
            let evolve = "";
            if (res.data.chain.evolves_to[0]) {
              evolve = res.data.chain.evolves_to[0].species.name;
            }
            setFetchedPokemons((prev) => [
              ...prev,
              { name, type, img, ability, evolve },
            ]);
          });
        });
      })
    );
  }, [pokemon]);

  return (
    <div className={style.Home}>
      <Navbar />
      <Search
        setPokemons={setPokemon}
        setFetchedPokemons={setFetchedPokemons}
      />
      <div className={style.cards}>
        {fetchedPokemons.map((pokemon) => (
          <Card
            key={pokemon.name}
            name={pokemon.name}
            type={pokemon.type}
            img={pokemon.img}
            ability={pokemon.ability}
            evolve={pokemon.evolve}
            favorites={favorites}
            setFavorites={setFavorites}
            pokemons={pokemons}
            setPokemons={setPokemons}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;