import axios from "axios";
import { Link } from "react-router-dom";

import style from "./Card.module.css";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const Card = ({
  id,
  name,
  type,
  img,
  ability,
  evolve,
  legendary,
  favorites,
  setFavorites,
  userLoggedIn,
}) => {
  const addToFavorite = async () => {
    console.log(userLoggedIn);
    const pokemon = favorites.find((favorite) => favorite.id === id);

    if (pokemon) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite !== pokemon
      );

      if (userLoggedIn) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/pokemons`,
          {
            pokemons: updatedFavorites,
          }
        );
        return setFavorites(data);
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return setFavorites(updatedFavorites);
    }

    const updatedFavorites = [...favorites, { id, name }];
    setFavorites(updatedFavorites);

    if (userLoggedIn) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/pokemons`,
        {
          pokemons: updatedFavorites,
        }
      );
      return setFavorites(data);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div
      className={style.card}
      style={{
        border: `10px solid ${
          legendary ? " rgb(192, 192, 192)" : "rgb(227 210 177)"
        }`,
      }}
    >
      <div className={style.header}>
        <h5>{`#${id}`}</h5>
        <h2 className={style.name}>{name}</h2>

        <div className={style.icon}>
          {type.map((type) => (
            <img
              key={type}
              title={type}
              className={style.iconpic}
              src={images[`${type}.png`]}
              alt="type pic"
            />
          ))}
        </div>
      </div>

      <img className={style.img} src={img} alt="pic" />

      <div className={style.info}>
        <div className={style.abilities}>
          <h4>Abilities:</h4>
          {ability.map((ability) => (
            <span key={ability}>{ability}</span>
          ))}
        </div>

        <div className={style.favorite}>
          {favorites && (
            <img
              className={style.pokeball}
              src={
                favorites.find((favorite) => favorite.id === id)
                  ? images[`pokeballfill.png`]
                  : images[`pokeball2.png`]
              }
              title={
                favorites.find((favorite) => favorite.id === id)
                  ? "Let Go!"
                  : "Catch!"
              }
              alt="pokeball"
              onClick={addToFavorite}
            />
          )}

          {evolve && (
            <div className={style.evolve}>
              <h4>Evolves to:</h4>
              <Link
                to={`/pokemon/${evolve}`}
                className={style.pokemonEvolution}
              >
                <span>{evolve}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
