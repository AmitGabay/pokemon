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
  favorites,
  setFavorites,
}) => {
  function addToFavorite() {
    const pokemon = favorites.find((favorites) => favorites.name === name);
    if (pokemon) {
      setFavorites((prevValue) => prevValue.filter((v) => v !== pokemon));
    } else {
      setFavorites((prevValue) => [
        ...prevValue,
        { name, type, img, ability, evolve },
      ]);
    }
  }

  return (
    <div className={style.card}>
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
            className={style.star}
            src={
              favorites.find((favorites) => favorites.name === name)
                ? images[`star_yellow.svg`]
                : images[`star_black.svg`]
            }
            alt="star"
            onClick={addToFavorite}
          />
          {evolve && (
            <div className={style.evolve}>
              <h4>Evolves to:</h4>
              <span>{evolve}</span>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
