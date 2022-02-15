import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import style from "./App.module.css";

function App() {
  return (
    <div className={style.App}>
      <Navbar />
      <Search />
      <div className={style.cards}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default App;
