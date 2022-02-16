import axios from "axios";
import { useState, useEffect } from "react";
import style from "./Card.module.css";

function randomNum() {
  return Math.floor(Math.random() * 898) + 1;
}

const Card = (props) => {
  // const [{ pokemonName, pokemonType, pokemonImg }, setPokemon] = useState();
  const [pokemonName, setName] = useState("");
  const [pokemonType, setType] = useState([]);
  const [pokemonImg, setImg] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${randomNum()}`,
    }).then((res) => {
      //   setPokemon({
      //     res.data.species.name,
      //     [...res.data.types.map((type) => type.name)],
      //     res.data.forms[0].url.sprites.front_default,
      //   });
      // });
      setName(res.data.species.name);
      setType([res.data.types.map((type) => type.type.name)]);
      setImg(res.data.forms[0].url.sprites.front_default);
    });
  }, []);

  return (
    <div className={style.card}>
      <div className={style.header}>
        <h2 className={style.name}>{pokemonName}</h2>
        {pokemonType.map((type) => (
          <span className={style.icon}>{type}</span>
        ))}
      </div>
      {/* <img className={style.img} src={pokemonImg} alt="pic" /> */}
    </div>
  );
};

export default Card;
