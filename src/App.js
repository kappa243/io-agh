import React from "react";
import AppNavbar from "./AppNavbar";
import { Outlet } from "react-router-dom";

const App = () => (
  <>
    <AppNavbar />
    <Outlet />
  </>
);

export default App;
