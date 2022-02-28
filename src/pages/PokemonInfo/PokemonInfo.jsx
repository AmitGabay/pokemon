import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import style from "./PokemonInfo.module.css";
import { getPokemon } from "../../utils";

function PokemonInfo() {
  const [fetchedPokemon, setFetchedPokemon] = useState();

  const { pick } = useParams();

  useEffect(() => {
    getPokemon(pick).then((pokemon) => setFetchedPokemon(pokemon));
  }, [pick]);

  return (
    <div className={style.Home}>
      <div className={style.cards}>
        {fetchedPokemon && (
          <Card
            id={fetchedPokemon.id}
            name={fetchedPokemon.name}
            type={fetchedPokemon.type}
            img={fetchedPokemon.img}
            ability={fetchedPokemon.ability}
            evolve={fetchedPokemon.evolve}
            legendary={fetchedPokemon.legendary}
          />
        )}
      </div>
    </div>
  );
}

export default PokemonInfo;
