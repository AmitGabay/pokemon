import { useState } from "react";
import style from "./Login.module.css";
import pokeball1 from "../../assets/pokeball1.png";
import axios from "axios";

const Login = ({ setUserLoggedIn }) => {
  const [mode, setMode] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeMode() {
    mode === "Login" ? setMode("Sign Up") : setMode("Login");
  }

  function typeEmail(event) {
    setEmail(event.target.value);
  }

  function typePassword(event) {
    setPassword(event.target.value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        {
          mode,
          email,
          password,
        }
      );
      setUserLoggedIn(true);
      localStorage.setItem("user", data.token);
      axios.defaults.headers.Authorization = data.token;
    } catch ({ response }) {
      if (response.status === 409) {
        alert("This email is already registered!");
      } else if (response.status === 403) {
        alert("Incorrect email or password. Try again!");
      }
    }
  };

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
            placeholder="email"
            value={email}
            name="email"
            required
            onChange={typeEmail}
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
