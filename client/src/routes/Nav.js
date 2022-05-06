import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EmployeeDetails from "../components/EmployeeDetails/EmployeeDetails";
import { UserContext } from "../context/UserContext";
import "./Nav.css";

function NavComponent() {
  const navigate = useNavigate();

  const isLogin = sessionStorage.getItem("islogin");
  const roleType = sessionStorage.getItem("role");

  let {
    user: { role, islogin, empName, empId },
  } = useContext(UserContext);

  islogin = isLogin ? isLogin : islogin;
  role = roleType ? roleType : role;

  useEffect(() => {
    if (!islogin) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <nav className="Nav-component">
        <div className="Navbar-Container">
          <ul className="NavMenu">
            {islogin ? (
              <>
                <li className="NavItem">
                  <Link to="/home" className="NavLink">
                    Home
                  </Link>
                </li>
                <li className="NavItem">
                  <Link to={`/employeeDetails/${empId}`} className="NavLink">
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}

            {islogin && role !== "EMPLOYEE" ? (
              <>
                <li className="NavItem">
                  <Link to="/view" className="NavLink">
                    View/Edit Employees
                  </Link>
                </li>
                {role === "ADMIN" ? (
                  <li className="NavItem">
                    <Link
                      to={`/employeeDetails/${empId}/new`}
                      className="NavLink"
                    >
                      Add Employees
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
                <li className="NavItem">
                  <Link to="/podDetails/0" className="NavLink">
                    Add POD
                  </Link>
                </li>
                <li className="NavItem">
                  <Link to="/podSearch" className="NavLink">
                    View/Edit POD
                  </Link>
                </li>
                <li className="NavItem">
                  <Link to="/ReportGeneratePage" className="NavLink">
                    Report Generation
                  </Link>
                </li>
              </>
            ) : (
              <li></li>
            )}

            {isLogin && role === "EMPLOYEE" ? (
              <li className="NavItem">
                <Link to="/podSearch" className="NavLink">
                  View POD
                </Link>
              </li>
            ) : (
              <></>
            )}
            {islogin ? (
              <li className="NavItem">
                <Link to="/Signout" className="NavLink">
                  Sign out
                </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        {islogin ? (
          <div>
            <p className="emp-Name">{empName}</p>
            <p className="emp-Role">{role}</p>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}

export { NavComponent };
