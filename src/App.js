import { Switch, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PokemonInfo from "./pages/PokemonInfo/PokemonInfo";
import Favorites from "./pages/Favorites/Favorites";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import FavoritePokemon from "./pages/FavoritePokemon/FavoritePokemon";
import style from "./App.module.css";

const randomNum = () => Math.floor(Math.random() * 898) + 1;

// const numbers = [];

/* const randomNum = () => {
  const randomnumber = Math.floor(Math.random() * 898) + 1;

  if (numbers.includes(randomnumber)) return randomNum();

  numbers.push(randomnumber);

  return randomnumber;
}; */

const App = () => {
  const [pokemons, setPokemons] = useState(new Array(1).fill().map(randomNum));
  const [favorites, setFavorites] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(Boolean(localStorage.user));

  useEffect(() => {
    if (!userLoggedIn) return;

    const getFavorites = async () => {
      const { data } = await axios(
        `${process.env.REACT_APP_SERVER_URL}/pokemons`
      );

      setFavorites(data);
    };

    getFavorites();
  }, [userLoggedIn]);

  const logout = () => {
    setUserLoggedIn(false);
    localStorage.clear();
    delete axios.defaults.headers.Authorization;
  };

  const resetArray = () => setPokemons(new Array(1).fill().map(randomNum));

  return (
    <>
      <Navbar userLoggedIn={userLoggedIn} logout={logout} />
      <Search favorites={favorites} />

      {userLoggedIn ? (
        <Switch className={style.App}>
          <Route exact path="/">
            <Home
              pokemons={pokemons}
              setPokemons={setPokemons}
              favorites={favorites}
              setFavorites={setFavorites}
              resetArray={resetArray}
            />
          </Route>

          <Route exact path="/favorites">
            <Favorites favorites={favorites} setFavorites={setFavorites} />
          </Route>
          <Route path="/pokemon/:pick">
            <PokemonInfo />
          </Route>
          <Route path="/favorites/:pick">
            <FavoritePokemon
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </Route>
        </Switch>
      ) : (
        <Login userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      )}
    </>
  );
};

export default App;
