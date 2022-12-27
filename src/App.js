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

const App = () => {
  const [pokemons, setPokemons] = useState(new Array(1).fill().map(randomNum));
  const [favorites, setFavorites] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(Boolean(localStorage.user));
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    if (!userLoggedIn) {
      setFavorites(JSON.parse(localStorage.favorites || "[]"));
      return;
    }

    const getFavorites = async () => {
      const { data } = await axios(
        `${process.env.REACT_APP_SERVER_URL}/pokemons`
      );

      setFavorites(data);
    };

    getFavorites();
  }, [userLoggedIn, signup]);

  const logout = () => {
    setUserLoggedIn(false);
    localStorage.clear();
    delete axios.defaults.headers.Authorization;
  };

  const signin = async () => {
    await localStorage.clear();
    setSignup(true);
  };

  const resetArray = () => setPokemons(new Array(1).fill().map(randomNum));

  return (
    <>
      <Navbar userLoggedIn={userLoggedIn} logout={logout} signin={signin} />
      <Search favorites={favorites} />
      <Switch className={style.App}>
        <Route exact path="/">
          <Home
            pokemons={pokemons}
            setPokemons={setPokemons}
            favorites={favorites}
            setFavorites={setFavorites}
            resetArray={resetArray}
            userLoggedIn={userLoggedIn}
          />
        </Route>

        <Route exact path="/favorites">
          <Favorites
            favorites={favorites}
            setFavorites={setFavorites}
            userLoggedIn={userLoggedIn}
          />
        </Route>
        <Route path="/pokemon/:pick">
          <PokemonInfo />
        </Route>
        <Route path="/favorites/:pick">
          <FavoritePokemon
            favorites={favorites}
            setFavorites={setFavorites}
            userLoggedIn={userLoggedIn}
          />
        </Route>
      </Switch>
      {signup && (
        <Login userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      )}
    </>
  );
};

export default App;
