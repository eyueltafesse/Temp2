import React, { useContext, useState, useEffect } from "react";
import "./LeavePlan.css";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import {
  getLPlansbyEmployee,
  createLeave,
  getSupEmail,
  editLeave,
} from "../../Services/ServiceLeave";
import { getEmployeeData } from "../../Services/ServiceEmployee";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const LeavePlan = () => {
  const {
    user: { role, empId },
  } = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
  const [leaveList, setLeaveList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idElement, setIdElement] = useState(0);
  const [istEmp, setIsEmp] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    authorizationFrom: "",
    daysOfLeave: 0,
    endDate: "",
    startDate: "",
    reasonForLeave: "",
    supervisor: "",
  });
  const [empName, setEmpName] = useState("");
  const getLeavePlans = async () => {
    try {
      const resp = await getLPlansbyEmployee(params.empId);
      const empData = await getEmployeeData(params.empId);
      if (resp?.data) {
        setLeaveList(resp.data);
      }
      if (empData?.data) {
        setEmpName(empData.data.name);
        if (empData.data.empId.toString() == empId && role != "ADMIN") {
          setIsEmp(true);
        } else {
          setIsEmp(false);
        }
      }
      console.log(leaveList);
      return resp;
    } catch (e) {
      console.log(e);
    }
  };

  const validations = () => {
    if (leaveForm.endDate <= leaveForm.startDate) {
      alert("End Date should be greater than Start Data");
      return false;
    } else if (leaveForm.daysOfLeave === 0) {
      alert("You should type the days of Leave");
      return false;
    } else if (
      leaveForm.reasonForLeave === "0" ||
      leaveForm.reasonForLeave === ""
    ) {
      alert("Please select a Reason for the Leave");
      return false;
    }
    return true;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role !== "SUPERVISOR") {
        const resp = await getSupEmail(leaveForm.supervisor);
        if (
          resp.data.name === "" ||
          resp.data.role !== "SUPERVISOR" ||
          resp.data.name === undefined
        ) {
          alert(
            "The person you add is not a Supervisor or we didn't find this Employee"
          );
        } else {
          save(resp.data.name);
        }
      } else {
        save("SUPERVISOR");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const save = async (supName) => {
    try {
      if (validations()) {
        if (edit) {
          const editresp = await editLeave(leaveForm, supName, idElement);
          if (editresp?.data) {
            alert("Leave have been successfully updated");
            handleCanel();
            getLeavePlans();
          }
          getLeavePlans();
        } else {
          const addresp = await createLeave(leaveForm, supName);
          if (addresp?.data) {
            alert("Leave have been successfully save");
            setLeaveForm({
              authorizationFrom: "",
              daysOfLeave: 0,
              endDate: "",
              startDate: "",
              reasonForLeave: "",
              supervisor: "",
            });
            getLeavePlans();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCanel = () => {
    setEdit(!edit);
    setLeaveForm({
      authorizationFrom: "",
      daysOfLeave: 0,
      endDate: "",
      startDate: "",
      reasonForLeave: "",
      supervisor: "",
    });
  };

  const handleonEdit = (values) => {
    console.log("print leave", values);
    setEdit(true);
    setIdElement(values.id);
    setLeaveForm({
      authorizationFrom: values.authorizationFrom,
      daysOfLeave: values.daysOfLeave,
      endDate: values.endDate,
      startDate: values.startDate,
      reasonForLeave: values.reasonForLeave,
      supervisor: values.supervisor,
    });
  };
  const handleOnChange = (e) => {
    setLeaveForm({
      ...leaveForm,
      empId: params.empId,
      name: empName,
      [e.target.name]: e.target.value,
    });
  };

  const navigateToEmp = () => {
    navigate(`/employeeDetails/${params.empId}`);
  };

  useEffect(() => {
    getLeavePlans();
  }, []);
  return (
    <>
      <div className="training-container">
        <Row className="title">
          <Col md={{ span: 8, offset: 2 }}>
            <h2> Leave Plan </h2>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5 }}>
            <Form.Group className="mb-3" controlId="employeeId">
              <Form.Label>Name: </Form.Label>
              <Form.Text> {empName} </Form.Text>
            </Form.Group>
          </Col>
          <Col md={{ span: 5 }}>
            <Form.Group className="mb-3" controlId="employeeId">
              <Form.Label>Employee ID: </Form.Label>
              <Form.Text> {params.empId} </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        {istEmp ? (
          <Row>
            <Col>
              <Form onSubmit={handleOnSubmit}>
                <Row>
                  <Col>
                    <label className="form-control-sm">
                      Reason of Leave :{" "}
                    </label>
                    <br></br>
                    <select
                      name="reasonForLeave"
                      className="form-select"
                      value={leaveForm.reasonForLeave}
                      required
                      onChange={handleOnChange}
                    >
                      <option value="0">---Reason of Leave----</option>
                      <option value="Sick">Sick</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Holiday">Holiday</option>
                    </select>
                  </Col>
                  <Col>
                    <label className="form-control-sm">Start Date: </label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      name="startDate"
                      value={leaveForm.startDate}
                      onChange={handleOnChange}
                      required
                    />
                  </Col>
                  <Col>
                    <label className="form-control-sm">End Date: </label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      name="endDate"
                      value={leaveForm.endDate}
                      onChange={handleOnChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label className="form-control-sm">Days: </label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      pattern=".{1,30}"
                      maxLength={2}
                      name="daysOfLeave"
                      value={leaveForm.daysOfLeave}
                      onChange={handleOnChange}
                      required
                    />
                  </Col>
                  <Col>
                    <label className="form-control-sm">Authorization: </label>
                    <input
                      className="form-control form-control-sm"
                      type="email"
                      name="authorizationFrom"
                      value={leaveForm.authorizationFrom}
                      onChange={handleOnChange}
                      required
                    />
                  </Col>
                  {role !== "SUPERVISOR" ? (
                    <Col>
                      <label className="form-control-sm">Supervisor: </label>
                      <input
                        className="form-control form-control-sm"
                        type="email"
                        name="supervisor"
                        value={leaveForm.supervisor}
                        onChange={handleOnChange}
                        required
                      />
                    </Col>
                  ) : (
                    <Col></Col>
                  )}

                  <Row>
                    {!edit ? (
                      <Col md={{ span: 1 }}>
                        <Button type="submit" className="btn- btn-primary">
                          Add
                        </Button>
                      </Col>
                    ) : (
                      <Col md={{ span: 1 }}>
                        <Button type="submit" className="btn- btn-primary">
                          Save
                        </Button>
                      </Col>
                    )}
                    <Col>
                      <Button
                        type="submit"
                        className="btn- btn-primary"
                        onClick={handleCanel}
                      >
                        cancel
                      </Button>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <h2>Records</h2>
                </Row>
              </Form>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <h2>Records</h2>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Reason For Leave</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days On Leave</th>
                  <th>Authorization Form</th>
                  <th>Supervisor</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {leaveList.map((training) => (
                  <tr key={training.id}>
                    <td>{training.reasonForLeave} </td>
                    <td>{training.startDate} </td>
                    <td>{training.endDate} </td>
                    <td>{training.daysOfLeave} </td>
                    <td>{training.authorizationFrom} </td>
                    <td>{training.supervisor} </td>
                    {istEmp ? (
                      <td>
                        {" "}
                        <span
                          onClick={() => {
                            handleonEdit(training);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </span>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 2 }}>
            <Button className="btn- btn-primary" onClick={navigateToEmp}>
              Profile
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 1, offset: 11 }}></Col>
        </Row>
      </div>
    </>
  );
};

export default LeavePlan;