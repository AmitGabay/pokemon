import { Switch, Route } from "react-router";
import { useState } from "react";
import Home from "./pages/Home/Home";
import PokemonInfo from "./pages/PokemonInfo/PokemonInfo";
import Favorites from "./pages/Favorites/Favorites";
import Navbar from "./components/Navbar/Navbar";
import style from "./App.module.css";

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
    new Array(6).fill().map(() => randomNum())
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.favorites || "[]")
  );

  return (
    <>
      <Navbar />
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
        <Route path="/pokemon/:evolve">
          <PokemonInfo favorites={favorites} setFavorites={setFavorites} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
