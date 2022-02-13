import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="cards">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default App;
