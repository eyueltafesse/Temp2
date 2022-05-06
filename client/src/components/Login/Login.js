import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal.js";
import "./Login.css";
import { Navigate } from "react-router-dom";
import { getuserLogin, login, userLogin } from "../../Services/ServiceLogin";
import { UserContext } from "../../context/UserContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import { ForgotPassword } from "./ForgotPassword.jsx";

const Login = () => {
  const { saveUserRole, user: role } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [empId, setEmpId] = useState({ value: "" });
  const [tempEmpId, setTempEmpId] = useState("");
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [password, setPassword] = useState("");
  const [forgotPasswordShow, setForgotPasswordShow] = useState(false);
  const [isResetPwSuccessful, setIsResetPwSuccessful] = useState(false);

  const onUserSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);
    const userDetails = await getuserLogin(dataObject);

    if (!userDetails.data.updatedPassword) {
      if (userDetails.data.initialPassword === dataObject.password) {
        setPassword(userDetails.data.initialPassword);
        setTempEmpId(userDetails.data.empId);
        setLoginModalShow(true);
      } else {
        alert("Password Incorrect, try again");
      }
    } else {
      const userexist = await login(dataObject);

      if (userexist && userexist.data) {
        const userdetails = await userLogin(dataObject);

        setEmpId(userdetails.data.empId);

        saveUserRole(
          userdetails.data.role,
          true,
          userdetails.data.name,
          userdetails.data.empId
        );

        switch (userdetails.data.role) {
          case "ADMIN":
            setIsAdmin(true);
            break;
          case "SUPERVISOR":
            setIsSupervisor(true);
            break;
          case "EMPLOYEE":
            setIsEmployee(true);
            break;
          default:
            alert("Yor access is not defined");
        }
      } else {
        alert("User name and Password should be correct");
      }
    }
  };

  const isResetSuccessful = (event) => {
    setIsResetPwSuccessful(event);
  };

  const loginModalEvent = (evt) => {
    console.log("hello", evt);
    setLoginModalShow(evt);
  };

  const onChangevalue = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setEmpId({ value: e.target.value });
    }
  };
  const redirect = <Navigate to="/home" />;

  if (isEmployee) {
    return <Navigate to={`/home`} />;
  }
  return isAdmin || isSupervisor ? (
    redirect
  ) : (
    <>
      <div className="login-container">
        <div className="wrapper">
          <div className="form-wrapper">
            <Form onSubmit={onUserSubmit} className="rounded p4 p-sm-3">
              <h2>Login</h2>
              <span className="success-message">
                {isResetPwSuccessful
                  ? "Your Password Reset was Successful"
                  : ""}
              </span>
              <Row>
                <Col md={{ span: 1, offset: 3 }}>Employee ID:</Col>
                <Col md={{ span: 4 }}>
                  <Form.Control
                    type="text"
                    value={empId.value}
                    required
                    name="empId"
                    onChange={onChangevalue}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 1, offset: 3 }}>Password:</Col>
                <Col md={{ span: 4 }}>
                  <Form.Control type="password" required name="password" />
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 1, offset: 6 }}>
                  <Button
                    className="login-btn"
                    variant="primary"
                    value="login"
                    type="submit"
                  >
                    Login
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 3, offset: 5 }}>
                  <Button
                    className="forgot-btn"
                    variant="link"
                    onClick={() => setForgotPasswordShow(true)}
                  >
                    Forgot Password?
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <LoginModal
        employee={tempEmpId}
        password={password}
        show={loginModalShow}
        onHide={(evt) => {
          loginModalEvent(evt);
        }}
      />
      <ForgotPassword
        show={forgotPasswordShow}
        onHide={() => setForgotPasswordShow(false)}
        isResetPwSuccessful={isResetSuccessful}
      />
    </>
  );
};

export default Login;
