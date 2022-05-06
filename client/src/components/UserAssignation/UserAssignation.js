import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import {
  searchEmployeebyId,
  searchEmployeebyname,
  addMember,
  getpodData,
  removeMember,
} from "../../Services/ServicePod";
import "./UserAssignation.css";
import Select from "react-select";
import { UserContext } from "../../context/UserContext";

const UserAssignation = () => {
  const {
    user: { role },
  } = useContext(UserContext);
  const params = useParams();
  const [userAssignedArr, setUserAssignedArr] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [empId, setEmpId] = useState(0);
  const [isAdmin, setIsAdmin] = useState(true);

  const [member, setMember] = useState({
    empId: "",
    name: "",
  });

  const deleteRow = async (ind) => {
    console.log("value", ind);
    try {
      const remove = await removeMember(ind, params.podId);
      if (remove.data) {
        setUserAssignedArr(remove.data.podEmployees);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (member.name !== "" && member.empId === "") {
      searchEmployeename(member.name);
    } else if (member.name === "" && member.empId !== "") {
      searchEmpbyId(member.empId);
    } else if (member.name === "" && member.empId === "") {
      alert(
        "To search for an employee you should at leat search by id or name "
      );
    } else if (member.name !== "" && member.empId !== "") {
      searchEmpbyId(member.empId);
    }
  };

  const searchEmpbyId = async (empId) => {
    try {
      const searchresp = await searchEmployeebyId(empId);
      console.log("values list ID", searchresp);
      if (searchresp.data) {
        setMemberList(
          searchresp.data.map((user) => ({
            value: user.empId,
            label: user.name,
          }))
        );
        setIsSearchOn(true);
        setMember({
          empId: "",
          name: "",
        });
      }
    } catch (e) {}
  };

  const handleObChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const searchEmployeename = async (empname) => {
    const resplist = await searchEmployeebyname(empname);
    console.log("values list name", resplist.data);
    if (resplist.data) {
      setMemberList(
        resplist.data.map((user) => ({ value: user.empId, label: user.name }))
      );
      setIsSearchOn(true);
      setMember({
        empId: "",
        name: "",
      });
    }
  };
  const onChangeComboBox = (e) => {
    console.log("print target", e.value);
    setEmpId(e.value);
    console.log("value selected", empId);
  };

  const AddUserAssigedRow = async (e) => {
    e.preventDefault();
    try {
      if (empId !== 0 || empId !== undefined) {
        const respAdd = await addMember(empId, params.podId);
        if (respAdd.data.podEmployees) {
          setUserAssignedArr(respAdd.data.podEmployees);
          setMemberList([]);
          setIsSearchOn(false);
        } else if (respAdd.data.error) {
          alert(respAdd.data.messages);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getMembers = async () => {
    try {
      const podresult = await getpodData(params.podId);
      console.log("print members", podresult);
      if (podresult.podEmployees) {
        setUserAssignedArr(podresult.podEmployees);
        if (role === "EMPLOYEE") {
          setIsAdmin(false);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);
  return (
    <div className="assignation-container">
      <Row>
        <Col className="podMembertitle">
          <h3>POD {params.podId} Member Table</h3>
        </Col>
      </Row>
      {isAdmin ? (
        <Row>
          <Col>
            <Form onSubmit={handleSearch}>
              <Row>
                <Col md={{ span: 3, offset: 1 }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee ID </Form.Label>
                    <Form.Control
                      type="text"
                      name="empId"
                      value={member.empId}
                      onChange={handleObChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={member.name}
                      onChange={handleObChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={{ span: 3 }}>
                  <Button className="btn-search" type="submit">
                    Search
                  </Button>
                </Col>
              </Row>
              {isSearchOn ? (
                <Row>
                  <Col md={{ span: 3, offset: 1 }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Select
                        className="basic-single"
                        classNamePrefix="Select"
                        isSearchable={true}
                        options={memberList}
                        onChange={(e) => {
                          onChangeComboBox(e);
                        }}
                      ></Select>
                    </Form.Group>
                  </Col>
                  <Col md={{ span: 1 }}>
                    <Button
                      variant="primary"
                      value="edit"
                      onClick={(e) => AddUserAssigedRow(e)}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              ) : (
                <></>
              )}
            </Form>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Project Title</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(userAssignedArr || []).map((user, ind) => (
                <tr key={ind}>
                  <td>{user.empId}</td>
                  <td>{user.name}</td>
                  <td> {user.infosysEmailId} </td>
                  <td> {user.projectTitle} </td>
                  <td> {user.status} </td>
                  {isAdmin ? (
                    <td>
                      <span onClick={deleteRow.bind(this, user.empId)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
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
        <Col>
          <Link to="/podSearch">Go Back</Link>
        </Col>
      </Row>
    </div>
  );
};

export default UserAssignation;
