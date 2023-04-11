import React from "react";
import { Outlet } from "react-router-dom";
import DebugNavbar from "./DebugNavbar";

const App = () => (
  <>
    <DebugNavbar />
    <Outlet />
  </>
);

export default App;
