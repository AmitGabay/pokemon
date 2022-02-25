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
  name,
  type,
  img,
  ability,
  evolve,
  legendary,
  favorites,
  setFavorites,
}) => {
  function addToFavorite() {
    const pokemon = favorites.find((favorites) => favorites.name === name);

    if (pokemon) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite !== pokemon
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [
        ...favorites,
        { name, type, img, ability, evolve, legendary },
      ];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
          <img
            className={style.pokeball}
            src={
              favorites.find((favorites) => favorites.name === name)
                ? images[`pokeballfill.png`]
                : images[`pokeball2.png`]
            }
            title={
              favorites.find((favorites) => favorites.name === name)
                ? "Let Go!"
                : "Catch!"
            }
            alt="pokeball"
            onClick={addToFavorite}
          />
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
