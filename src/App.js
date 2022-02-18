import { Switch, Route } from "react-router";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import style from "./App.module.css";

function App() {
  return (
    <Switch className={style.App}>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/favorites">
        <Favorites />
      </Route>
    </Switch>
  );
}

export default App;
