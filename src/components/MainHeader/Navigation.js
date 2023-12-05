// import React, { useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

// import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";
import { useNavigate } from "react-router";

const Navigation = () => {
  // const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="/">Users</a>
        </li>
        <li>
          <a href="/">Admin</a>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
