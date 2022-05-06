import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, unstable_HistoryRouter, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getEmployeeData, updateEmployee } from "../../Services/ServiceEmployee";
import Alert from "react-bootstrap/Alert";
import "./Work.css";
import { Form } from "react-bootstrap";
import PrimarySkills from "./PrimarySkills";
import { getWorkExp, updateWorkExp } from "../../Services/ServiceWorkExp";
import { useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";

const EditWork = ({ empId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [eMessage, setEMessage] = useState("")
  const [hasMessage, setHasMessage] = useState(false);
  // constructor for emp: David
  const [emp, setEmp] = useState({
    id: params.empId,
    name: "",
  })
  // constructor for workexp: David
  const [workexp, setWorkexp] = useState({
    empId: params.empId,
    employeeEmpId: params.empId,
    totalYearsOfExperience: "",
    totalYearsOfExperienceInInfosys: "",
    totalYearsOfExperienceOutsideInfosys: "",
  });
  // validates workexp fields: David
  const validWork = () => {
    if (workexp.totalYearsOfExperience > 50 || workexp.totalYearsOfExperience < 0 || 
      workexp.totalYearsOfExperienceInInfosys > 50 || workexp.totalYearsOfExperienceInInfosys < 0 ||
      workexp.totalYearsOfExperienceOutsideInfosys > 50 || workexp.totalYearsOfExperienceOutsideInfosys < 0 
    ) {
      setEMessage("Experience must be between 50 and 0");
      console.log(eMessage)
      return false;
    } else {
      return true;
    }
  }
  // saves workexp to db if fields are valid: David
  const saveWorkExp = async (e) => {
    try {
      e.preventDefault();
      if (validWork()) {
        const res = updateWorkExp(params.empId, workexp).then(() => {
          return setWorkexp(res.data)
        }).then(navigateToView())
      } else {
        setEMessage("Experience must be between 50 and 0");
        setHasMessage(true);
      } 
    } catch (e) {
      console.log(e);
    }
  };
  // gets employee details from db: david
  const getEmp = async () => {
    try {
      if (params.empId == localStorage.getItem("empId")) {
          emp.name = localStorage.getItem("empName");
      } else {
        const empData = await getEmployeeData(params.empId);
        setEmp({name: empData.data.name});
        return empData.data.name;
      }
    } catch (e) {
        console.log(e);
    }
  }
  // gets work info from db: David
  const getWorkInfo = async () => {
    try { 
      const workData = await getWorkExp(params.empId);
        setWorkexp(workData.data);
        workData.name = getEmp();
        return workData;
    } catch (e) {
        console.error(e);
    }
  }
  // handles change in workexp field: David
  const handleObChange = (e) => {
    setWorkexp({ ...workexp, [e.target.name]: e.target.value });
  };
  // navigates to view workexp url: David
  const navigateToView = () => {
    const id = params.empId;
    navigate(`/workexp/${id}/show`)
  }

  useEffect(() => {
    if (params.empId !== undefined) {
      getWorkInfo(params.empId)
    }
  }, []);
  return (
    <div class="work-container">
      {hasMessage && 
        <Alert variant="danger" style={{ width: "42rem" }}>
          <Alert.Heading>
            {eMessage}
          </Alert.Heading>
        </Alert>
      }
      <Row className="work-row">
        <Col>
          <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <h2> Edit Work Experience Details </h2>
              </Col>
            </Row>
          <Form>
          <Row>
              <Col md={{ span: 5 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={emp.name || ""}
                    disabled={true}
                  />
                </Form.Group>
              </Col>
            </Row>
          <Row>
              <Col md={{ span: 5 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Employee Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="empId"
                    value={params.empId || ""}
                    disabled={true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 5 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Total Years of Experience</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalYearsOfExperience"
                    value={workexp.totalYearsOfExperience || ""}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 5, offset: 1 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Years of Experience at Infosys</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalYearsOfExperienceInInfosys"
                    value={workexp.totalYearsOfExperienceInInfosys || ""}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 6 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Years of Experience outside Infosys</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalYearsOfExperienceOutsideInfosys"
                    value={workexp.totalYearsOfExperienceOutsideInfosys || ""}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 11 }}>
                <PrimarySkills />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2 }}>
                <Button className="footer-btn" variant="info" type="submit" onClick={(e) => saveWorkExp(e)}>
                  Save
                </Button>
              </Col>
              <Col md={{ span: 2 }}>
                <Button className="footer-btn" variant="danger" onClick={navigateToView}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditWork;
