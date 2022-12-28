import { useState, useEffect } from "react";

import { getPokemon } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";
import style from "./Home.module.css";

const randomNum = () => Math.floor(Math.random() * 898) + 1;

const Home = ({ favorites, setFavorites }) => {
  const [randomPokemon, setRandomPokemon] = useState(randomNum);
  const [fetchedPokemon, setFetchedPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRandomnPokemon = async () => {
      setFetchedPokemon(await getPokemon(randomPokemon));
      setIsLoading(false);
    };

    getRandomnPokemon();
  }, [randomPokemon]);

  const getNewPokemon = () => {
    setFetchedPokemon([]);
    setRandomPokemon(randomNum);
    setIsLoading(true);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className={style.cards}>
        {fetchedPokemon && (
          <Card
            key={fetchedPokemon.name}
            id={fetchedPokemon.id}
            name={fetchedPokemon.name}
            type={fetchedPokemon.type}
            img={fetchedPokemon.img}
            ability={fetchedPokemon.ability}
            evolve={fetchedPokemon.evolve}
            legendary={fetchedPokemon.legendary}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </div>

      <div className={style.container}>
        <button className={style.btn} onClick={getNewPokemon}>
          New Pokemon!
        </button>
      </div>
    </>
  );
};

export default Home;
