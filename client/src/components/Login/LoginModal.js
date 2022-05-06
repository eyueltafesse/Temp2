import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Form,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { resetmainPassword } from "../../Services/ServiceLogin";
import "./Login.css";

const LoginModal = (props) => {
  const navigate = useNavigate();
  const [resetForm, setResetForm] = useState({
    securityQuestion: "",
    securityAnswer: "",
    password: "",
    initialPassword: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const dataObject = Object.fromEntries(formData);

      if (dataObject.password !== dataObject.rePassword) {
        alert("confirmation password should be match");
      } else if (props.password !== dataObject.initialPassword) {
        alert("Old password incorrect try again");
      } else {
        const resp = await resetmainPassword(resetForm, props.employee);
        if (resp.data) {
          alert("Your password had been updated successfuly!");
          navigate("/");
          props.onHide(false);
        }
      }
    } catch (error) {}
  };

  const handleonChange = (e) => {
    setResetForm({
      ...resetForm,
      empId: props.employee,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Modal
        onSubmit={handleOnSubmit}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Password Reset
          </Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body className="show-grid">
            {/* <Container> */}
            <p className="lm-head" md={5}>
              In order to protect your account make sure your password is longer
              than 7 characters - include 1 uppercase, 1 number and 1 special
              character.
            </p>
            <Row>
              <Col className="lm-qus" md={5}>
                Employee Id:
              </Col>
              <Col md={7}>
                <Form.Control
                  className="hello"
                  required
                  value={props.employee}
                  disabled={true}
                  type="text"
                  name="empId"
                />
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Security Question:
              </Col>
              <Col md={7}>
                <select
                  className="form-select"
                  aria-label="Select security question"
                  name="securityQuestion"
                  value={resetForm.securityQuestion}
                  required
                  onChange={handleonChange}
                >
                  <option value="1">
                    What is the name of the city you were born in?
                  </option>
                  <option value="2">What is the name of your first pet?</option>
                  <option value="3">
                    What is the middle name of your mother?
                  </option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Answer:
              </Col>
              <Col md={7}>
                <Form.Control
                  type="text"
                  required
                  name="securityAnswer"
                  value={resetForm.securityAnswer}
                  onChange={handleonChange}
                />
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Old Password:
              </Col>
              <Col md={7}>
                <Form.Control
                  type="password"
                  required
                  onChange={handleonChange}
                  value={resetForm.initialPassword}
                  name="initialPassword"
                  placeholder=""
                />
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                New Password:
              </Col>
              <Col md={7}>
                <Form.Control
                  type="password"
                  required
                  onChange={handleonChange}
                  value={resetForm.password}
                  name="password"
                  pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                />
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Re-enter New Password:
              </Col>
              <Col md={7}>
                <Form.Control
                  type="password"
                  required
                  name="rePassword"
                  onChange={handleonChange}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Continue</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default LoginModal;
