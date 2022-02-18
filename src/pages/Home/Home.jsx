import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import style from "./Home.module.css";
import { useState } from "react";

function randomNum() {
  return Math.floor(Math.random() * 898) + 1;
}

function Home() {
  const [pokemons, setPokemons] = useState(new Array(3).fill());

  return (
    <div className={style.Home}>
      <Navbar />
      <Search setPokemons={setPokemons} />
      <div className={style.cards}>
        {pokemons.map((pokemon) => (
          <Card pokemon={pokemons.length === 1 ? pokemon : randomNum()} />
        ))}
      </div>
    </div>
  );
}

export default Home;
