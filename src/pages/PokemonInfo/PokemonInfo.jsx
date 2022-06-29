import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getPokemon } from "../../utils";
import Card from "../../components/Card/Card";
import style from "./PokemonInfo.module.css";

const PokemonInfo = () => {
  const [fetchedPokemon, setFetchedPokemon] = useState();

  const { pick } = useParams();

  useEffect(() => {
    getPokemon(pick).then(setFetchedPokemon);
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
};

export default PokemonInfo;
