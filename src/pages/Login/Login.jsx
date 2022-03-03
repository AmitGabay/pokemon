import { useState } from "react";
import style from "./Login.module.css";
import pokeball1 from "../../assets/pokeball1.png";

const Login = ({ setIsLoggedIn }) => {
  const [mode, setMode] = useState("Login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function changeMode() {
    mode === "Login" ? setMode("Sign Up") : setMode("Login");
  }

  function typeUserName(event) {
    setUserName(event.target.value);
  }

  function typePassword(event) {
    setPassword(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(userName));
    setIsLoggedIn(true);
  }

  return (
    <div className={style.login}>
      <div className={style.container}>
        <div className={style.header}>
          <h5>Hello!</h5>
          <h2 className={style.name}>{mode}</h2>
          <div className={style.icon}>
            <img src={pokeball1} className={style.icon} alt="pokeball"></img>
          </div>
        </div>
        <form className={style.form} onSubmit={onSubmit}>
          <input
            className={style.input}
            type="text"
            placeholder="Username"
            value={userName}
            name="uname"
            required
            onChange={typeUserName}
          ></input>
          <input
            className={style.input}
            type="password"
            placeholder="Password"
            value={password}
            name="psw"
            minLength="8"
            required
            onChange={typePassword}
          ></input>
          <button className={style.btn} type="submit">
            {mode}
          </button>
        </form>
        <div className={style.signup}>
          <h4>{mode === "Login" ? "Not a member?" : "Already a member?"}</h4>
          <button className={style.link} onClick={changeMode}>
            {mode === "Login" ? "Signup now" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
