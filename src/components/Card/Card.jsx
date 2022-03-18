import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

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
  refreshFavorites,
}) => {
  function addToFavorite() {
    const pokemon = favorites.find((favorite) => favorite.id === id);
    const userId = localStorage.user;

    if (pokemon) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite !== pokemon
      );
      setFavorites(updatedFavorites);
      refreshFavorites();

      axios.post("http://localhost:5000/pokemons", {
        userId,
        pokemons: updatedFavorites,
      });
    } else {
      const updatedFavorites = [...favorites, { id, name }];
      setFavorites(updatedFavorites);

      axios.post("http://localhost:5000/pokemons", {
        userId,
        pokemons: updatedFavorites,
      });
    }
  }

  return (
    <div
      className={style.card}
      style={{
        border: `10px solid ${legendary ? "#d8d8d8" : "rgb(247, 223, 13)"}`,
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
