import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { changeState } from "../../Services/ServiceEmployee";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const ChangeStatus = (props, { status }) => {
  const navigate = useNavigate();
  const options = [
    { label: "Move to a diferent city", value: "Move to a diferent city" },
    {
      label: "Move to a different companny",
      value: "Move to a different companny",
    },
    { label: "Change project", value: "Change project" },
    { label: "Finish project", value: "Finish project" },
    { label: "Training requirement", value: "Training requirement" },
    { label: "Bench", value: "Bench" },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const formemptData = new FormData(e.target);
      const dataObject = Object.fromEntries(formemptData);

      if (dataObject.statusReason) {
        if (props.status === "INACTIVE") {
          const formactive = {
            statusReason: dataObject.statusReason,
            status: "ACTIVE",
            empId: props.employee,
          };
          const onstate = await changeState(formactive);
          if (onstate.data) {
            alert("user status had change");
            navigate("/view");
            props.onHide(false);
          } else {
            alert("Please verify the information");
          }
        } else {
          const formInactive = {
            statusReason: dataObject.statusReason,
            status: "INACTIVE",
            empId: props.employee,
          };
          const onstate = await changeState(formInactive);
          if (onstate.data) {
            alert("user status had change");
            props.onHide(false);
            navigate("/view");
          } else {
            alert("Please verify the information");
          }
        }
      } else {
        alert("Please select a Reason");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Inactive an Employee
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleOnSubmit}>
          <Modal.Body className="show-grid">
            {/* <Container> */}
            <p className="lm-head" md={5}>
              After you send this user to inactive mode, you can't asign him to
              any pod
            </p>
            <Row>
              <Col className="lm-qus" md={5}>
                Confirm Employee Id:
              </Col>
              <Col md={7}>
                <Form.Control
                  className="hello"
                  value={props.employee}
                  disabled={true}
                  required
                  type="text"
                  name="empId"
                  onChange={(value) => console.log(value)}
                />
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Reason:
              </Col>
              <Col md={7}>
                <Select
                  options={options}
                  name="statusReason"
                  onChange={(value) => console.log(value.value)}
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

export default ChangeStatus;
