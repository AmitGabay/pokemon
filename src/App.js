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

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(Boolean(localStorage.user));
  const [login, setLogin] = useState(false);

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
  }, [userLoggedIn]);

  const logout = () => {
    setUserLoggedIn(false);
    localStorage.removeItem("user");
    delete axios.defaults.headers.Authorization;
    setFavorites(JSON.parse(localStorage.favorites || "[]"));
  };

  const signin = () => {
    setLogin(true);
  };

  return (
    <>
      <Navbar
        userLoggedIn={userLoggedIn}
        logout={logout}
        signin={signin}
        login={login}
      />
      {login ? (
        <Login setUserLoggedIn={setUserLoggedIn} setLogin={setLogin} />
      ) : (
        <>
          {" "}
          <Search favorites={favorites} />
          <Switch className={style.App}>
            <Route exact path="/">
              <Home
                favorites={favorites}
                setFavorites={setFavorites}
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
        </>
      )}
    </>
  );
};

export default App;
