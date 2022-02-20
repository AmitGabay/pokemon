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
  pokemonName,
  pokemonType,
  pokemonImg,
  pokemonAbility,
  pokemonEvolve,
  favorites,
  setFavorites,
}) => {
  function addToFavorite(event) {
    event.preventDefault();
    if (favorites.includes(pokemonName)) {
      setFavorites((prevValue) => prevValue.filter((v) => v !== pokemonName));
    } else {
      setFavorites((prevValue) => [...prevValue, pokemonName]);
    }
  }

  return (
    <div className={style.card}>
      <div className={style.header}>
        <h2 className={style.name}>{pokemonName}</h2>
        <div className={style.icon}>
          {pokemonType.map((type) => (
            <img
              key={type}
              className={style.iconpic}
              src={images[`${type}.png`]}
              alt="type pic"
            />
          ))}
        </div>
      </div>
      <img className={style.img} src={pokemonImg} alt="pic" />
      <div className={style.info}>
        <div className={style.abilities}>
          <h4>Abilities:</h4>
          {pokemonAbility.map((ability) => (
            <span key={ability}>{ability}</span>
          ))}
        </div>
        <div className={style.favorite}>
          <img
            className={style.star}
            src={
              favorites.includes(pokemonName)
                ? images[`star_yellow.svg`]
                : images[`star_black.svg`]
            }
            alt="star"
            onClick={addToFavorite}
          />
          {pokemonEvolve && (
            <div className={style.evolve}>
              <h4>Evolve to:</h4>
              <span>{pokemonEvolve}</span>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
