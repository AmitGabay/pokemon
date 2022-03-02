import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Login.module.css";
import pokeball1 from "../../assets/pokeball1.png";

const Login = () => {
  const [isSignedUp, setIsSignedUp] = useState(true);
  return (
    <div className={style.login}>
      <div className={style.container}>
        <div className={style.header}>
          <h5>Hello!</h5>
          <h2 className={style.name}>{isSignedUp ? "Login" : "Sign Up"}</h2>
          <div className={style.icon}>
            <img src={pokeball1} className={style.icon} alt="pokeball"></img>
          </div>
        </div>
        <form className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Username"
            name="uname"
            required
          ></input>
          <input
            className={style.input}
            type="password"
            placeholder="Password"
            name="psw"
            required
          ></input>
          <button className={style.btn} type="submit">
            {isSignedUp ? "Login" : "Sign Up"}
          </button>
        </form>
        {isSignedUp && (
          <div className={style.signup}>
            <h4>Not a member?</h4>
            <Link to="/signup" className={style.link}>
              Signup now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
