import { Switch, Route } from "react-router";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import style from "./App.module.css";

function randomNum() {
  return Math.floor(Math.random() * 898) + 1;
}

function App() {
  const [pokemons, setPokemons] = useState(
    new Array(6).fill().map(() => randomNum())
  );
  const [favorites, setFavorites] = useState([]);

  return (
    <Switch className={style.App}>
      <Route exact path="/">
        <Home
          pokemons={pokemons}
          setPokemons={setPokemons}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </Route>
      <Route path="/favorites">
        <Favorites favorites={favorites} setFavorites={setFavorites} />
      </Route>
    </Switch>
  );
}

export default App;
