import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import style from "./PokemonInfo.module.css";
import { getPokemon } from "../../utils";

function PokemonInfo({ favorites, setFavorites }) {
  const [fetchedPokemon, setFetchedPokemon] = useState();

  const { evolve } = useParams();

  useEffect(() => {
    getPokemon(evolve).then((pokemon) => setFetchedPokemon(pokemon));
  }, [evolve]);

  return (
    <div className={style.Home}>
      <div className={style.cards}>
        {fetchedPokemon && (
          <Card
            name={fetchedPokemon.name}
            type={fetchedPokemon.type}
            img={fetchedPokemon.img}
            ability={fetchedPokemon.ability}
            evolve={fetchedPokemon.evolve}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </div>
    </div>
  );
}

export default PokemonInfo;
