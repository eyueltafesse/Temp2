import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { NavComponent } from "../../routes/Nav";

const Signout = () => {
  const { resetRole } = useContext(UserContext);
  useEffect(() => {
    console.log('hello');
    resetRole();
  }, []);
  console.log('reset');
  const relogin = <Navigate to="/" />;
  return relogin;
};

export default Signout;
