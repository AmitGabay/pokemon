import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <h2 className={style.name}>Pokemon Name</h2>
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
