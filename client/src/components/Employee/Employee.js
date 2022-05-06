import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

import "./Employee.css";
import { addEmployee, updateEmployee } from "../../Services/ServiceEmployee";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getEmployeeData } from "../../Services/ServiceEmployee";
import { UserContext } from "../../context/UserContext";

const Employee = ({ empId, isEdit }) => {
  const {
    user: { role },
  } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [showA, setShowA] = useState(false);
  const params = useParams();
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    infosysEmailId: "",
    phoneNumber: "",
    jobLevel: "",
    joinDate: "",
    currentLocation: "",
    role: "EMPLOYEE",
    pod: "1",
  });

  const getEmployee = async () => {
    try {
      const empresp = await getEmployeeData(params.id);

      setFormData(empresp.data);
      setEdit(params.isEdit);
      if (role === "ADMIN") {
        setDisable(false);
      }
    } catch (e) {
      console.error(e.data.message);
    }
  };

  const toggleShowA = () => setShowA(!showA);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);
    try {
      console.log(edit);
      if (edit === "false") {
        const employee = await addEmployee(dataObject);
        alert(employee.data);
        if (employee.status === 200) {
          navigate("/home");
        } else {
          alert(employee.status);
        }
      }
      if (edit === "true") {
        const editEmployee = await updateEmployee(dataObject, params.id);
        alert(editEmployee.data);
      }
    } catch (e) {
      console.error(e.data.message);
    }
  };

  const handleObChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigateToEmployee = (e) => {
    navigate("/home");
  };

  useEffect(() => {
    console.log(params.id);
    if (params.id !== undefined) {
      getEmployee(params);
    }
  }, []);

  return (
    <div className="employee-container">
      <div className="employee-wrapper">
        <div className="form-wrapper">
          <form onSubmit={handleOnSubmit} className="employee-form">
            <h2>Employee Details</h2>
            <label htmlFor="for">Employee Id:</label>
            <input
              pattern=".{8,10}"
              type="text"
              name="empId"
              value={formData.empId}
              disabled={disable}
              required
              onChange={handleObChange}
              class="form-control"
            />
            <label htmlFor="for">Name:</label>
            <input
              type="name"
              name="name"
              required
              value={formData.name}
              onChange={handleObChange}
              class="form-control"
            />
            <label htmlFor="for">Infosys Email:</label>
            <input
              type="email"
              name="infosysEmailId"
              required
              value={formData.infosysEmailId}
              onChange={handleObChange}
              placeholder="@infosys.com"
              class="form-control"
            />
            <label htmlFor="for">Phone:</label>
            <input
              type="phone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleObChange}
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="XXX-XXX-XXXX"
              class="form-control"
            />
            <label htmlFor="for">Job Level:</label>
            <input
              type="job"
              name="jobLevel"
              value={formData.jobLevel}
              onChange={handleObChange}
              class="form-control"
            />
            <label htmlFor="for">Infosys Joining Date:</label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleObChange}
              class="form-control"
            />
            <label htmlFor="for">Current Location:</label>
            <input
              type="location"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleObChange}
              class="form-control"
            />
            <label htmlFor="for">AccessLevel:</label>
            <select
              className="form-select"
              aria-label="Select Role"
              name="role"
              value={formData.role}
              disabled={disable}
              onChange={handleObChange}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="SUPERVISOR">Supervisor</option>
              <option value="ADMIN">Admin</option>
            </select>

            <label htmlFor="for">POD</label>
            <select
              className="form-select"
              onChange={handleObChange}
              value={formData.pod}
              aria-label="Select POD"
              disabled={disable}
              name="pod"
            >
              <option value="1">POD 1</option>
              <option value="2">POD 2</option>
              <option value="3">POD 3</option>
            </select>
            <Row>
              <Col md={{ span: 2 }}>
                <Button className="footer-btn" variant="primary" type="submit">
                  Save
                </Button>
              </Col>

              <Col md={{ span: 2 }}>
                <Button
                  onClick={(e) => {
                    navigateToEmployee(e);
                  }}
                  variant="primary"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
            <Link to={`/workexp/${formData.empId}/show`}>Work Exp</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Employee;
