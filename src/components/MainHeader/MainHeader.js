import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const token = localStorage.getItem("token");
  return (
    <header className={classes["main-header"]}>
      <h1>{props.pageinfo}</h1>
      {token ? <Navigation /> : ""}
    </header>
  );
};

export default MainHeader;
