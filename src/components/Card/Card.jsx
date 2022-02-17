import axios from "axios";
import { useState, useEffect } from "react";
import style from "./Card.module.css";

function randomNum() {
  return Math.floor(Math.random() * 898) + 1;
}

const Card = (props) => {
  const [pokemonName, setName] = useState("");
  const [pokemonType, setType] = useState([]);
  const [pokemonImg, setImg] = useState("");
  const [pokemonAbility, setAbility] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${randomNum()}`,
    }).then((res) => {
      setName(res.data.species.name);
      setType(res.data.types.map((type) => type.type.name));
      setImg(res.data.sprites.front_default);
      setAbility(res.data.abilities.map((ability) => ability.ability.name));
    });
  }, []);

  return (
    <div className={style.card}>
      <div className={style.header}>
        <h2 className={style.name}>{pokemonName}</h2>
        <div className={style.icon}>
          {pokemonType.map((type) => (
            <span>{type}</span>
          ))}
        </div>
      </div>
      <img className={style.img} src={pokemonImg} alt="pic" />
      <div className={style.ability}>
        <h4 className={style.abilities}>Abilities:</h4>
        {pokemonAbility.map((ability) => (
          <span>{ability}</span>
        ))}
      </div>
    </div>
  );
};

export default Card;
