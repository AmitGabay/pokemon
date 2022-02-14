import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Search />
      <div className="cards">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default App;
