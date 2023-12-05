import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "./pages/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Protected from "./components/Protected";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
// import { AuthContextProvider } from "./store/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "Signup", element: <Signup /> },
      { path: "Login", element: <Login /> },
      {
        path: "/",
        element: <Protected />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
