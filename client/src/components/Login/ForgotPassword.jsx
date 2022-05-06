import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { getuserLogin, getForgotPwDetails } from "../../Services/ServiceLogin";
import { securityQuestions } from "../../Constants";
import "./Login.css";

export const ForgotPassword = (props) => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [hasSecurityQuestionPass, setHasSecurityQuestionPass] = useState(null);
  const [empIdValue, setEmpIdValue] = React.useState("");
  const [newPasswordValue, setNewPasswordValue] = React.useState("");
  const [newPasswordValue2, setNewPasswordValue2] = React.useState("");
  const [isPasswordMatching, setIsPasswordMatching] = React.useState(null);
  const [securityAnswerValue, setSecurityAnswerValue] = React.useState("");
  const [employee, setEmployee] = useState({});
  const [errorMessage, setErrorMessage] = useState({
    empIdError: "",
    securityQuestionError: "",
    mismatchError: "",
  });
  const [formData, setFormData] = useState({
    empId: "",
    password: "",
    password2: "",
    securityAnswer: "",
  });

  const handleChange = (event) => {
    const re = /^[0-9\b]+$/;

    formData.empId = event.target.value;
    if (event.target.value === "" || re.test(event.target.value)) {
      setEmpIdValue(event.target.value);
    }
  };
  const handleChangeQuestion = (event) => {
    formData.securityAnswer = event.target.value;
    setSecurityAnswerValue(event.target.value);
  };
  const handleChangePW = (event) => {
    formData.password = event.target.value;
    setNewPasswordValue(event.target.value);
  };
  const handleChangePW2 = (event) => {
    formData.password2 = event.target.value;
    setNewPasswordValue2(event.target.value);
  };

  const lastsubmit = async () => {
    try {
      const strongPass = new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
      );

      if (isEmployee) {
        if (formData.securityAnswer !== "") {
          if (!strongPass.test(formData.password)) {
            alert("Please use a right patter for this password");
          } else if (formData.password !== formData.password2) {
            setErrorMessage({ mismatchError: "Passwords do not match" });
            setIsPasswordMatching(false);
          } else {
            const resetPW = await getForgotPwDetails(formData.empId, formData);
            if (resetPW.data === "Password reset successful") {
              setHasSecurityQuestionPass(true);
              props.isResetPwSuccessful(true);
              setEmpIdValue("");
              setSecurityAnswerValue("");
              setNewPasswordValue("");
              setNewPasswordValue2("");
              setIsPasswordMatching(null);
              setHasSecurityQuestionPass(null);
              setIsEmployee(false);
              await props.onHide();
            } else {
              alert(resetPW.data);
            }
          }
        } else {
          alert("Please fill the information");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const userDetails = await getuserLogin(formData);
    setEmployee(userDetails.data);
    if (Number(formData.empId) === userDetails.data.empId) {
      setIsEmployee(true);
    } else {
      setIsEmployee(false);
      setErrorMessage({ empIdError: "Your Employee Id is Incorrect" });
    }
  };

  const cancelForgotPw = async () => {
    setEmpIdValue("");
    setIsEmployee(false);
    setSecurityAnswerValue("");
    setNewPasswordValue("");
    setNewPasswordValue2("");
    setIsPasswordMatching(null);
    setHasSecurityQuestionPass(null);
    await props.onHide();
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="md"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Form.Label className="forgot-label">
            Please enter your Employee ID.
          </Form.Label>
          <Row>
            <Col md={10}>
              <Form.Control
                type="text"
                required
                name="answer"
                value={empIdValue}
                disabled={isEmployee}
                onChange={handleChange}
              />
            </Col>
          </Row>
          {!isEmployee ? (
            <span className="error-message">{errorMessage.empIdError}</span>
          ) : (
            <>
              <Form.Label className="forgot-label">
                {securityQuestions[Number(employee.securityQuestion) - 1]}
              </Form.Label>
              <Row>
                {/* {!hasSecurityQuestionPass ? <span className="error-message">{errorMessage.securityQuestionError}</span> : ""} */}
                <Col md={10}>
                  <Form.Control
                    type="password"
                    required
                    name="answer"
                    value={securityAnswerValue}
                    onChange={handleChangeQuestion}
                  />
                </Col>
              </Row>
              <Form.Label className="forgot-label">
                Please Enter Your New Password:
              </Form.Label>
              <Row>
                <p className="pass-leyend" md={2}>
                  Password must contain more than 7 characters, include 1
                  uppercase, 1 number, and 1 special character.{" "}
                </p>
                <Col md={10}>
                  <Form.Control
                    type="password"
                    required
                    name="newPassword"
                    value={newPasswordValue}
                    pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                    onChange={handleChangePW}
                  />
                  {isPasswordMatching === false ? (
                    <span className="error-message">
                      {errorMessage.mismatchError}
                    </span>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Form.Label className="forgot-label">
                Please Re-Enter Your New Password:
              </Form.Label>
              <Row>
                <Col md={10}>
                  <Form.Control
                    type="password"
                    required
                    name="newPassword"
                    value={newPasswordValue2}
                    pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                    onChange={handleChangePW2}
                  />
                  {isPasswordMatching === false ? (
                    <span className="error-message">
                      {errorMessage.mismatchError}
                    </span>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={cancelForgotPw}>Cancel</Button>
          {isEmployee ? (
            <Button onClick={() => lastsubmit()}>Submit</Button>
          ) : (
            <Button onClick={handleClick} type="submit">
              {" "}
              Continue
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
