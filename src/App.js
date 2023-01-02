import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PokemonInfo from "./pages/PokemonInfo/PokemonInfo";
import Favorites from "./pages/Favorites/Favorites";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import FavoritePokemon from "./pages/FavoritePokemon/FavoritePokemon";

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(Boolean(localStorage.user));

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

  return (
    <>
      <Navbar userLoggedIn={userLoggedIn} logout={logout} />
      <Search favorites={favorites} />
      <Routes>
        <Route
          path="/login"
          element={<Login setUserLoggedIn={setUserLoggedIn} />}
        ></Route>
        <Route
          exact
          path="/"
          element={
            <Home
              favorites={favorites}
              setFavorites={setFavorites}
              userLoggedIn={userLoggedIn}
            />
          }
        ></Route>

        <Route
          exact
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              setFavorites={setFavorites}
              userLoggedIn={userLoggedIn}
            />
          }
        ></Route>
        <Route path="/pokemon/:pick" element={<PokemonInfo />}></Route>
        <Route
          path="/favorites/:pick"
          element={
            <FavoritePokemon
              favorites={favorites}
              setFavorites={setFavorites}
              userLoggedIn={userLoggedIn}
            />
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
