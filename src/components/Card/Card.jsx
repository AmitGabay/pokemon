import axios from "axios";
import { useState, useEffect } from "react";
import style from "./Card.module.css";

const Card = (props) => {
  function randomNum() {
    return Math.floor(Math.random() * 20) + 1;
  }

  const [pokemonName, setName] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${randomNum()}`,
    }).then((res) => {
      setName(res.data.species.name);
    });
  }, []);

  return (
    <div className={style.card}>
      <div className={style.header}>
        <h2 className={style.name}>{pokemonName}</h2>
        <span className={style.icon}>icon</span>
      </div>
      <img
        className={style.img}
        src="https://dalicanvas.co.il/wp-content/uploads/2020/02/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg"
        alt="pic"
      />
    </div>
  );
};

export default Card;
