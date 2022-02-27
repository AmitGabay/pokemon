import pokeball1 from "../../assets/pokeball1.png";
import style from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={style.spinner_container}>
      <img src={pokeball1} alt="pokeball" className={style.loading_spinner} />
    </div>
  );
}
