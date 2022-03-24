import { Switch, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PokemonInfo from "./pages/PokemonInfo/PokemonInfo";
import Favorites from "./pages/Favorites/Favorites";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import style from "./App.module.css";
import FavoritePokemon from "./pages/FavoritePokemon/FavoritePokemon";

const numbers = [];

// const randomNum = () => Math.floor(Math.random() * 898) + 1;

function randomNum() {
  let randomnumber = Math.floor(Math.random() * 898) + 1;
  return (
    numbers.includes(randomnumber) ? randomNum() : numbers.push(randomnumber),
    randomnumber
  );
}

// function randomNum() {
//   let randomnumber;
//   do {
//     randomnumber = Math.floor(Math.random() * 898) + 1;
//   } while (numbers.includes(randomnumber));
//   numbers.push(randomnumber);
//   console.log(numbers);
//   return randomnumber;
// }

function App() {
  const [pokemons, setPokemons] = useState(
    new Array(1).fill().map(() => randomNum())
  );
  const [favorites, setFavorites] = useState([]);

  const [userId, setUserId] = useState(localStorage.user);

  function logout() {
    setUserId("");
    localStorage.clear();
  }

  useEffect(() => {
    if (!userId) return;

    const getFavorites = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/pokemons?userId=${userId}`
      );
      setFavorites(data);
    };
    getFavorites();
  }, [userId]);

  function resetArray() {
    setPokemons(new Array(1).fill().map(() => randomNum()));
  }

  return (
    <>
      <Navbar userId={userId} logout={logout} />
      <Search favorites={favorites} />
      {userId ? (
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
        <Login userId={userId} setUserId={setUserId} />
      )}
    </>
  );
}

export default App;
