import React, { useEffect, useContext } from "react";
import { UserProvider, UserContext } from "../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { NavComponent } from "../routes/Nav";
import RoutesComponent from "../routes/Routes";

function App() {
  
  return (
    <UserProvider>
      <NavComponent />
      <RoutesComponent />
    </UserProvider>
  );
}

export default App;
