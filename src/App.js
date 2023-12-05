// import React, { useContext, useState } from "react";

// import Login from "./components/Login/Login";
// import Home from "./components/Home/Home";
import { Fragment } from "react";
// import AuthContext from "./store/auth-context";
// import Signup from "./pages/Signup";
import { Outlet } from "react-router";

function App() {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}

export default App;
// {/* <Signup/>
// <main>
//   {!ctx.isLoggedIn && <Login />}
//   {ctx.isLoggedIn && <Home />}
// </main> */}
