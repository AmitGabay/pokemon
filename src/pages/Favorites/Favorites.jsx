import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
// import style from "./Favorites.module.css";

function Favorites(props) {
  return (
    <div>
      <Navbar />
      <div>
        <Card pokemon={props.pokemon} />
      </div>
    </div>
  );
}

export default Favorites;
