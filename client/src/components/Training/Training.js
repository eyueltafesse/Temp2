import React, { useState, useEffect } from "react";
import "./Training.css";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeData } from "../../Services/ServiceEmployee";
import {
  getallTraining,
  addTrainingandCertifications,
  getallTrainingbyEmployee,
  editTandC,
  removeItem,
} from "../../Services/ServiceTraining";
import Catalog from "./Catalog";

const Training = () => {
  const params = useParams();
  const navigate = useNavigate();
  let [edit, setEdit] = useState(false);
  const [empName, setEmpName] = useState("");
  const [nameOptions, setNameOptions] = useState([]);
  const [listData, setListData] = useState([]);
  const [statusOp, setStatusOp] = useState("0");
  const [trainingList, setTrainingList] = useState([]);
  const [catalogModalShow, setCatalogModalShow] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [elementSelected, setElementSelected] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [tandc, setTandc] = useState({
    empId: params.empId,
    status: "",
  });
  const [type, setType] = useState("");
  const optionStatus = [
    { value: "Complete", label: "Complete" },
    { value: "In Progress", label: "In Progress" },
    { value: "To Do", label: "To Do" },
  ];

  const getEmpData = async () => {
    try {
      const empId = params.empId;
      const resp = await getEmployeeData(empId);
      console.log("empdata", resp.data.trainingAndCertifications);
      if (resp.data) {
        setEmpName(resp.data.name);
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  };

  const handleCanel = () => {
    setEdit(!edit);
    setElementSelected({
      type: "",
      filterType: "",
      duration: "",
      link: "",
      id: "",
    });
    setItemId(0);
    setStatusOp("0");
  };

  const handleonEdit = (values) => {
    console.log("print training", values);
    setEdit(true);
    setElementSelected({
      type: values.certification.type,
      filterType: values.certification.filterType,
      duration: values.certification.duration,
      link: values.certification.link,
      id: values.certification.id,
    });
    setItemId(values.id);
    setStatusOp(values.status);
  };

  const addTtraining = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        const repedit = await editTandC(statusOp, itemId);
        console.log("print result", repedit);
        if (repedit?.data) {
          alert("Your information have been saved successfully");
          getTrainingbyEmployee();
          handleCanel();
        }
      } else {
        const respadd = await addTrainingandCertifications(
          elementSelected.id,
          tandc
        );
        if (respadd?.data) {
          alert("Your information have been saved successfully");
          console.log("response", respadd.data);
          setListData(respadd?.data.trainingAndCertifications);
          setElementSelected({
            type: "",
            filterType: "",
            duration: "",
            link: "",
            id: "",
          });
          setItemId(0);
          setStatusOp("0");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const catalogModalEvent = () => {
    getCatalogList();
    setCatalogModalShow(false);
  };

  const getTrainingbyEmployee = async () => {
    try {
      const respTandC = await getallTrainingbyEmployee(params.empId);
      console.log("print result", respTandC.data);

      if (respTandC?.data !== []) setListData(respTandC.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnRemove = async (trainingId) => {
    try {
      const reqremove = await removeItem(trainingId, params.empId);
      console.log("respons remove", reqremove);
      if (!reqremove?.data.error) {
        alert("Certification successfully deleted");
        getTrainingbyEmployee();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onChangeComboBox = (e) => {
    const selectedId = e.target.value;
    const trainingSelected = trainingList.filter(function (item) {
      return item.id == selectedId;
    })[0];
    setElementSelected(trainingSelected);
  };

  const onChangeStatus = (e) => {
    const selectedstatus = e.target.value;
    if (edit) {
      setStatusOp({ status: selectedstatus });
    }

    setTandc({
      empId: params.empId,
      status: selectedstatus,
    });
  };

  const handleonChange = (e) => {
    setElementSelected({ ...elementSelected, [e.target.name]: e.target.value });
  };

  const getCatalogList = async () => {
    try {
      const respList = await getallTraining();
      setTrainingList(respList.data);
      setNameOptions(
        trainingList.map((item) => ({ value: item.id, label: item.name }))
      );
    } catch (e) {
      console.log(e);
    }
  };
  const navigateToEmp = () => {
    navigate(`/employeeDetails/${params.empId}`);
  };

  useEffect(() => {
    getEmpData();
    getCatalogList();
    getTrainingbyEmployee();
  }, []);
  return (
    <>
      <div className="training-container">
        <Row className="title">
          <Col md={{ span: 8, offset: 2 }}>
            <h2> Training & Certifications </h2>
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
        <Row>
          <Col>
            <Form onSubmit={addTtraining}>
              <Row>
                <Col>
                  <label className="form-control-sm">Type: </label>
                  <br></br>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="type"
                    value={elementSelected.type}
                    disabled={true}
                    required
                    onChange={handleonChange}
                  />
                </Col>
                <Col>
                  <label className="form-control-sm">Filter: </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="filterType"
                    disabled={true}
                    onChange={handleonChange}
                    value={elementSelected.filterType}
                    required
                  />
                </Col>
                <Col>
                  <label className="form-control-sm">Duration: </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="duration"
                    disabled={true}
                    onChange={handleonChange}
                    required
                    value={elementSelected.duration}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-control-sm">Link: </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="link"
                    required
                    disabled={true}
                    onChange={handleonChange}
                    value={elementSelected.link}
                  />
                </Col>
                <Col>
                  <label className="form-control-sm">Status: </label>
                  <select
                    className="form-control form-control-sm"
                    options={optionStatus}
                    onChange={(e) => {
                      onChangeStatus(e);
                    }}
                  >
                    <option value="0">--Select Status--</option>
                    {(optionStatus || []).map((status, ind) => (
                      <option key={ind} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <label className="form-control-sm">Name: </label>
                  <select
                    className="form-control form-control-sm"
                    name="name"
                    required
                    disabled={edit}
                    value={elementSelected.id}
                    onChange={(e) => {
                      onChangeComboBox(e);
                    }}
                  >
                    <option value="0">--Select Name--</option>
                    {(trainingList || []).map((option, ind) => (
                      <option key={ind} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
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
                      Cancel
                    </Button>
                  </Col>
                  <Col md={{ offset: 3 }}>
                    <Button
                      className="prof-link"
                      variant="link"
                      onClick={() => setCatalogModalShow(true)}
                    >
                      Add External Training
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

        <Row>
          <Col>
            <Table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Filter</th>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Link</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {listData !== [] ? (
                <tbody>
                  {listData.map((training) => (
                    <tr key={training.id}>
                      <td>{training.certification.type} </td>
                      <td>{training.certification.filterType} </td>
                      <td>{training.certification.name} </td>
                      <td>{training.certification.duration} </td>
                      <td>
                        <a href={training.certification.link} target="_blank">
                          Go...
                        </a>{" "}
                      </td>
                      <td>{training.status}</td>
                      <td>
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

                      <td>
                        <span
                          onClick={() => {
                            handleOnRemove(training.id);
                          }}
                        >
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
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody></tbody>
              )}
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
        <Catalog
          show={catalogModalShow}
          onHide={() => {
            catalogModalEvent();
          }}
        />
      </div>
    </>
  );
};

export default Training;
