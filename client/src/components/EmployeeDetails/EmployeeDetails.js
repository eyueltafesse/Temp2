import React, { useState, useEffect, useContext, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import {
  getEmployeeData,
  addEmployee,
  updateEmployee,
} from "../../Services/ServiceEmployee";
import "./EmployeeDetails.css";
import ChangeStatus from "./ChangeStatus";


const EmployeeDetails = () => {
  const {
    user: { role, empId },
  } = useContext(UserContext);
  const params = useParams();
  const [edit, setEdit] = useState();
  const [isNew, setIsNew] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [disable, setDisable] = useState(false);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pods, setPods] = useState([]);
  const [showLeave, setShowLeave] = useState(false);
  const navigate = useNavigate();
  const location = useLocation;
  const pathname = window.location.pathname;
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    infosysEmailId: "",
    phoneNumber: "",
    jobLevel: "",
    joinDate: "",
    currentLocation: "",
    projectTitle: "",
    infosysTitle: "",
    status: "",
    role: "",
    pod: "",
    statusReason: "",
  });

  const statusModalEvent = (evt) => {
    setStatusModalShow(evt);
  };

  const handleedit = () => {
    setEdit(false);
  };

  const getEmployee = async (e) => {
    try {
      const id = params.empId.toString();
      if (role !== "EMPLOYEE") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      if (pathname == `/employeeDetails/${id}/new`) {
        setIsNew(true);
        setEdit(false);
        setDisable(false);
        setFormData({
          empId: "",
          name: "",
          infosysEmailId: "",
          phoneNumber: "",
          jobLevel: "",
          joinDate: "",
          currentLocation: "",
          projectTitle: "",
          infosysTitle: "",
          status: "",
          role: "",
          statusReason: "",
        });
      } else {
        setIsNew(false);

        const empresp = await getEmployeeData(params.empId);
        if (empresp.data) {
          console.log("Employee", empresp.data.pods);
          setPods(empresp.data.pods.map((pod) => pod.podName));
          if (role === "EMPLOYEE") {
            setShowLeave(true);
          } else if (empId !== empresp.data.empId && !isNew) {
            setShowLeave(true);
          } else if (role === "SUPERVISOR") {
            setShowLeave(true);
          }
          setFormData({
            empId: empresp.data.empId,
            name: empresp.data.name,
            infosysEmailId: empresp.data.infosysEmailId,
            phoneNumber: empresp.data.phoneNumber,
            jobLevel: empresp.data.jobLevel,
            joinDate: empresp.data.joinDate,
            currentLocation: empresp.data.currentLocation,
            projectTitle: empresp.data.projectTitle,
            infosysTitle: empresp.data.infosysTitle,
            status: empresp.data.status,
            role: empresp.data.role,
            statusReason: empresp.data.statusReason,
          });
          //setFormData(empresp.data);
          setEdit(true);
          setDisable(true);
        }
      }
      if (role !== "EMPLOYEE") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  //This event will send the form information
  //to the save route, for edit or new employee
  //by:Esmeralda
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const formemptData = new FormData(e.target);
      const dataObject = Object.fromEntries(formemptData);
      if (isNew) {
        if (
          dataObject.role.toString() === "" ||
          dataObject.role.toString() === "0"
        ) {
          alert("Please select Access Level role for this user");
        } else if (
          dataObject.projectTitle === "" ||
          dataObject.projectTitle === "0"
        ) {
          alert("Please select Project Title for this user");
        } else {
          setFormData({
            empId: dataObject.empId,
            name: dataObject.name,
            infosysEmailId: dataObject.infosysEmailId,
            phoneNumber: dataObject.phoneNumber,
            jobLevel: dataObject.jobLevel,
            joinDate: dataObject.joinDate,
            currentLocation: dataObject.currentLocation,
            projectTitle: dataObject.projectTitle,
            infosysTitle: dataObject.infosysTitle,
            status: "ACTIVE",
            role: dataObject.role,
            pod: dataObject.pod,
            statusReason: "New Employee",
          });
          console.log(formData);
          const employee = await addEmployee(formData);
          if (employee.data.includes("Password")) {
            alert(employee.data);
            setEdit(true);
            setIsNew(!isNew);
          } else {
            alert(employee.data);
          }
        }
      } else if (!isNew) {
        console.log(formData);
        const editEmployee = await updateEmployee(formData);
        if (editEmployee.data) {
          if (editEmployee.data.includes("successfully")) {
            setEdit(true);
            alert("Employee was successfully updated!");
          } else {
            alert(editEmployee.data);
          }
        }
      }
    } catch (e) {
      console.error(e.data.message);
    }
  };

  const handleObChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navForSubMenu = (type) => {
    switch (type) {
      case "WORK":
        navigate(`/workexp/${formData.empId}/show`);
        break;
      case "LEAVE":
        navigate(`/leavePlan/${formData.empId}`);
        break;
      case "TRAINING":
        navigate(`/training/${formData.empId}`);
        break;
      case "RESUME":
        navigate(`/resume/${formData.empId}`);
        break;
    }
  };
  const cancelAction = () => {
    setEdit(true);
  };

  const handleOnclick = (e) => {
    e.preventDefault();
    setStatusModalShow(true);
    setEdit(!edit);
  };

  useEffect(() => {
    getEmployee();
  }, [pathname]);


  return (
    <>
      <div className="profile-wrapper">
        {!isNew ? (
          <div className="Profile-Navigation">
            <Button
              className="prof-link"
              variant="link"
              onClick={() => navForSubMenu("WORK")}
            >
              Work Experience
            </Button>
            <Button
              className="prof-link"
              variant="link"
              onClick={() => navForSubMenu("RESUME")}
            >
              Resume Generation
            </Button>
            {showLeave ? (
              <Button
                className="prof-link"
                variant="link"
                onClick={() => navForSubMenu("LEAVE")}
              >
                Leave Plan
              </Button>
            ) : (
              <></>
            )}
            <Button
              className="prof-link"
              variant="link"
              onClick={() => navForSubMenu("TRAINING")}
            >
              Training & Certifications
            </Button>
          </div>
        ) : (
          <></>
        )}

        <div className="empDetails-container">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h2> Employee Details </h2>
            </Col>
          </Row>
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Employee ID </Form.Label>
                  {disable ? (
                    <Form.Control
                      pattern=".{8,10}"
                      type="text"
                      name="empId"
                      value={formData.empId}
                      disabled="true"
                      onChange={handleObChange}
                    />
                  ) : (
                    <Form.Control
                      pattern=".{8,10}"
                      type="text"
                      name="empId"
                      value={formData.empId}
                      disabled={edit}
                      required
                      onChange={handleObChange}
                    />
                  )}
                </Form.Group>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Infosys Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joinDate"
                    disabled={edit}
                    value={formData.joinDate}
                    onChange={handleObChange}
                    class="form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    name="name"
                    required
                    disabled={edit}
                    value={formData.name}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Current Location</Form.Label>
                  <Form.Control
                    type="location"
                    name="currentLocation"
                    disabled={edit}
                    value={formData.currentLocation}
                    onChange={handleObChange}
                    class="form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Infosys Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="infosysEmailId"
                    required
                    disabled={edit}
                    value={formData.infosysEmailId}
                    onChange={handleObChange}
                    placeholder="@infosys.com"
                  />
                </Form.Group>
              </Col>
              {!isNew ? (
                <Col md={{ span: 4 }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>POD</Form.Label>
                    <Form.Control
                      type="text"
                      name="pods"
                      as="textarea"
                      rows={2}
                      value={pods}
                      disabled={true}
                    />
                  </Form.Group>
                </Col>
              ) : (
                <></>
              )}
            </Row>

            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    disabled={edit}
                    onChange={handleObChange}
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    placeholder="XXX-XXX-XXXX"
                    class="form-control"
                  />
                </Form.Group>
              </Col>
              {isAdmin && !isNew ? (
                <Col md={{ span: 4 }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <div>
                      <Fragment>
                        <label class="switch" name="status">
                          <input
                            type="checkbox"
                            disabled={edit}
                            checked={
                              formData.status === "INACTIVE" ? false : true
                            }
                            onClick={handleOnclick}
                          />
                          <span class="slider round"></span>
                        </label>
                        <Form.Label>{formData.status}</Form.Label>
                      </Fragment>
                    </div>
                  </Form.Group>
                </Col>
              ) : (
                <Col></Col>
              )}
            </Row>
            <Row>
              <Col md={{ span: 2, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Job Level</Form.Label>
                  <Form.Control
                    type="job"
                    name="jobLevel"
                    disabled={edit}
                    value={formData.jobLevel}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>

              <Col md={{ span: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Infosys Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="infosysTitle"
                    disabled={edit}
                    value={formData.infosysTitle}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Project Title</Form.Label>
                  <select
                    className="form-select"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleObChange}
                    disabled={edit}
                    required
                    aria-label="Select Project Title"
                  >
                    <option value="0">---Select Project Title---</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Architect">Architect</option>
                    <option value="developer">Developer</option>
                    <option value="qa">QA/Tester</option>
                    <option value="business analyst">Business Analyst</option>
                    <option value="Scrum Master">Scrum Master</option>
                  </select>
                </Form.Group>
              </Col>
              {role === "ADMIN" ? (
                <Col md={{ span: 4 }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Access Level: </Form.Label>
                    <select
                      className="form-select"
                      label="Select Role"
                      name="role"
                      defaultValue={"EMPLOYEE"}
                      value={formData.role}
                      disabled={edit}
                      required
                      onChange={handleObChange}
                    >
                      <option value="0">---Access Level role---</option>
                      <option value="EMPLOYEE">Employee</option>
                      <option value="SUPERVISOR">Supervisor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </Form.Group>
                </Col>
              ) : (
                <Col></Col>
              )}
            </Row>
            <Row>
              {!edit ? (
                <Col md={{ span: 2, offset: 2 }}>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Col>
              ) : (
                <Col></Col>
              )}
              {edit ? (
                <Col md={{ span: 2 }}>
                  <Button variant="primary" onClick={() => handleedit()}>
                    Edit
                  </Button>
                </Col>
              ) : (
                <Col md={{ span: 2 }}>
                  <Button variant="primary" onClick={() => cancelAction()}>
                    Cancel
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </div>
      </div>
      <ChangeStatus
        employee={formData.empId}
        status={formData.status}
        show={statusModalShow}
        onHide={(evt) => {
          statusModalEvent(evt);
        }}
      />
    </>
  );
};

export default EmployeeDetails;
