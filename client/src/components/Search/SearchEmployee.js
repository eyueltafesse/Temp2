import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

import { searchEmployee, searchAll } from "../../Services/ServiceEmployee";

import DisplayEmployee from "./DisplayEmployees";
import "./Search.css";
import { Form, Nav } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

const SearchEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const {
    user: { role },
  } = useContext(UserContext);
  const [searchby, setSearchby] = useState("");
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const getAll = async () => {
    const allemp = await searchAll();
    setEmployees(allemp.data);
  };
  const searchHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const dataObject = Object.fromEntries(formData);
    if (dataObject.name === "" && dataObject.empId === "") {
      alert(
        "To search you need to insert a value on the employee id or name field"
      );
    } else if (dataObject.name !== "" && dataObject.name.length < 3) {
      alert("please use more than 3 caracter to seach by name");
    } else {
      const resp = await searchEmployee(dataObject);
      if (resp.status === 200) {
        setEmployees(resp.data);
        if (resp.data.length === 0) {
          alert("we didn't find any Employee with that information");
        }
      } else {
        alert(
          "Something went wrong, we didn't find the information " +
            " please verify your information "
        );
      }
    }

    e.target.reset();
  };

  const onChange = (e) => {
    setEmployees({ ...employees, [e.target.name]: e.target.value || "" });
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <div class="search-container">
      <Row className="form-row">
        <Col>
          <Form onSubmit={searchHandler}>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <h2> Search Employee </h2>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 5 }}>
                <Form.Group className="mb-3" controlId="employeeId">
                  <Form.Label>Employee Id</Form.Label>
                  <Form.Control type="text" size="7" name="empId" />
                </Form.Group>
              </Col>
              <Col md={{ span: 5 }}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" />
                </Form.Group>
              </Col>
              <Col md={{ span: 2 }}>
                <Button className="search-btn" type="submit" variant="primary">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <div className="employee-list">
        <DisplayEmployee listemp={employees} />
      </div>
    </div>
  );
};

export default SearchEmployee;
