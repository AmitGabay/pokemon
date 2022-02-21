import { Switch, Route } from "react-router";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import style from "./App.module.css";

function randomNum() {
  return Math.floor(Math.random() * 898) + 1;
}

function App() {
  const [pokemon, setPokemon] = useState(
    new Array(6).fill().map(() => randomNum())
  );
  const [favorites, setFavorites] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  return (
    <Switch className={style.App}>
      <Route exact path="/">
        <Home
          pokemon={pokemon}
          setPokemon={setPokemon}
          favorites={favorites}
          setFavorites={setFavorites}
          pokemons={pokemons}
          setPokemons={setPokemons}
        />
      </Route>
      <Route path="/favorites">
        <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
          pokemons={pokemons}
          setPokemons={setPokemons}
        />
      </Route>
    </Switch>
  );
}

export default App;
