import axios from "axios";
import { useState, useEffect } from "react";
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

const Card = (props) => {
  const [pokemonName, setName] = useState("");
  const [pokemonType, setType] = useState([]);
  const [pokemonImg, setImg] = useState("");
  const [pokemonAbility, setAbility] = useState([]);
  const [pokemonEvolve, setEvolve] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${props.pokemon}`,
    }).then((res) => {
      setName(res.data.species.name);
      setType(res.data.types.map((type) => type.type.name));
      setImg(res.data.sprites.front_default);
      setAbility(res.data.abilities.map((ability) => ability.ability.name));
      axios({
        method: "get",
        url: `${res.data.species.url}`,
      }).then((res) => {
        console.log(res.data.evolution_chain.url);
        axios({
          method: "get",
          url: `${res.data.evolution_chain.url}`,
        }).then((res) => {
          setEvolve(res.data.chain.evolves_to[0].species.name);
          console.log(res.data.chain.evolves_to[0].species.name);
        });
      });
    });
  }, [props.pokemon]);

  return (
    <div className={style.card}>
      <div className={style.header}>
        <h2 className={style.name}>{pokemonName}</h2>
        <div className={style.icon}>
          {pokemonType.map((type) => (
            <img
              className={style.iconpic}
              src={images[`${type}.png`]}
              alt="type pic"
            ></img>
          ))}
        </div>
      </div>
      <img className={style.img} src={pokemonImg} alt="pic" />
      <div className={style.info}>
        <div className={style.abilities}>
          <h4>Abilities:</h4>
          {pokemonAbility.map((ability) => (
            <span>{ability}</span>
          ))}
        </div>
        {pokemonEvolve && (
          <div className={style.evolve}>
            <h4>Evolve to:</h4>
            <span>{pokemonEvolve}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
