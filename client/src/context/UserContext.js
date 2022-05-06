import React, { useState } from "react";

const UserContext = React.createContext();
const { Provider, Consumer } = UserContext;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: "",
    islogin: false,
    empName: "",
    empId: "",
  });

  const saveUserRole = (role, islogin, empName, empId) => {
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("islogin", islogin);
    sessionStorage.setItem("empName", empName);
    sessionStorage.setItem("empId", empId);
    setUser({ role, islogin, empName, empId });
  };

  const resetRole = () => {
    sessionStorage.clear();
    setUser({ role: null, islogin: false });
  };

  return (
    <Provider value={{ user, saveUserRole, resetRole }}>{children}</Provider>
  );
};

export { UserProvider, Consumer as UserConsumer, UserContext };
