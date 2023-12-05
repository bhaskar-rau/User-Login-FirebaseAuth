// import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Home.module.css";
import { useNavigate } from "react-router";
import MainHeader from "../MainHeader/MainHeader";
const Home = (props) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <Card className={classes.home}>
      <MainHeader pageinfo={"Home Page"} />
      <h1>Welcome back!</h1>
      <Button onClick={logoutHandler}>Logout</Button>
    </Card>
  );
};

export default Home;
