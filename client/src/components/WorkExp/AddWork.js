import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getEmployeeData } from "../../Services/ServiceEmployee";
import { addWorkExp, getWorkExp } from "../../Services/ServiceWorkExp";
import { UserContext } from "../../context/UserContext";
import "./Work.css"
import PrimarySkills from "./PrimarySkills";
import { render } from "@testing-library/react";
import ViewWork from "./ViewWork";

const AddWork = ({empId}) => {
    const params = useParams();
    const navigate = useNavigate();
    const [eMessage, setEMessage] = useState("")
    const [hasMessage, setHasMessage] = useState(false);
    const [hasExp, setHasExp] = useState(false);
    // constructor for workexp: David
    const [workexp, setWorkexp] = useState({
        totalYearsOfExperience: "",
        totalYearsOfExperienceInInfosys: "",
        totalYearsOfExperienceOutsideInfosys: "",
    });
  
    const handleObChange = (e) => {
        setWorkexp({ ...workexp, [e.target.name]: e.target.value });
    };
    // validates workexp fields: David
    const validWork = () => {
      if (workexp.totalYearsOfExperience > 50 || workexp.totalYearsOfExperience < 0 || 
        workexp.totalYearsOfExperienceInInfosys > 50 || workexp.totalYearsOfExperienceInInfosys < 0 ||
        workexp.totalYearsOfExperienceOutsideInfosys > 50 || workexp.totalYearsOfExperienceOutsideInfosys < 0 
      ) {
        setEMessage("Years must be less than 50 and greater than 0");
        return false;
      } else {
        return true;
      }
    }
    // saves workexp to db if fields are valid: David
    const addWork = async (e, workexp) => {
      try {
        e.preventDefault();
        if (validWork()) {
          const data = await addWorkExp(params.empId, workexp).then(() => {

          }).then(() => {
            setHasExp(true);
          });
        } else {
          setEMessage("Experience must be between 50 and 0");
          setHasMessage(true);
        }
      } catch (e) {
        console.log(e)
      }
    }
    // navigates to view workexp url: David
    const navigateToView = (e) => {
      navigate(`/workexp/${params.empId}/show`)
    }
    const navigateToEmp = () => {
      navigate(`/employeeDetails/${params.empId}`)
    }
    // Displays empty work experience form: David
    useEffect(() => {

    }, [])
    if (hasExp) {
      return (
        <ViewWork />
      )
    }
    return (
            <div className="work-container">
                <div>
                {hasMessage &&
                    <Alert variant="danger" style={{ width: "42rem" }}>
                      <Alert.Heading>
                          {eMessage}
                      </Alert.Heading>
                    </Alert>
                }
                <Alert variant="warning" style={{ width: "42rem" }}>
                    <Alert.Heading>
                        You currently do not have any Work Experience
                    </Alert.Heading>
                </Alert>
                <Row className="work-row">
                  <Col>
                    <Form>
                      <Row>
                        <Col md={{ span: 5, offset: 2 }}>
                          <h2> Work Experience Details </h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={{ span: 5 }}>
                          <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Total Years of Experience</Form.Label>
                            <Form.Control
                              type="number"
                              name="totalYearsOfExperience"
                              value={workexp.totalYearsOfExperience  || ""}
                              onChange={handleObChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={{ span: 5, offset: 1 }}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Years of Experience at Infosys</Form.Label>
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
                        <Col md={{ span: 6 }}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Years of Experience outside Infosys</Form.Label>
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
                    <Col md={{ span: 11 }}>
                      <PrimarySkills />
                    </Col>
                  </Row>
                      <Row>
                    <Col md={{ span: 4 }}>
                      <Button className="footer-btn" variant="info" onClick={(e) => addWork(e, workexp)}>
                        Add Work Experience
                      </Button>
                    </Col>
                    <Col md={{ span: 2 }}>
                        <Button className="footer-btn" variant="danger"onClick={ navigateToEmp } >Cancel</Button>
                    </Col>
                </Row>
                </Form>
                </Col>
              </Row>
            </div>
        </div>
    )
} 
export default AddWork;