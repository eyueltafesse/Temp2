import React, { useState, useEffect, useContext, Fragment } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import {
  addPod,
  editPod,
  getpodData,
  changeStatusPod,
} from "../../Services/ServicePod";

const PodEditView = ({ podData }) => {
  const {
    user: { role },
  } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const [edit, setEdit] = useState(false);
  const pathname = window.location.pathname;
  const [isNew, setIsNew] = useState(false);
  const [podId, setPodId] = useState(0);
  const [isAdmin, setisAdmin] = useState(true);
  const [formPod, setFormPod] = useState({
    podAnchor: "",
    podName: "",
    anchorName: "",
    client: "",
    accountAnchor: "",
    tech: "",
    location: "",
    status: "",
    joinDate: "",
    endDate: "",
  });

  const handleedit = () => {
    setEdit(false);
  };

  const addNewForm = () => {
    setEdit(false);
    setIsNew(true);
    setFormPod({
      podAnchor: "",
      podName: "",
      anchorName: "",
      client: "",
      accountAnchor: "",
      tech: "",
      location: "",
      status: "",
      joinDate: "",
      endDate: "",
    });
    setPodId(0);
  };

  const validations = () => {
    if (formPod.endDate !== "" && formPod.joinDate !== "") {
      if (formPod.endDate <= formPod.joinDate) {
        alert("End Date should be greater than Start Data");
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const formemptData = new FormData(e.target);
      const dataObject = Object.fromEntries(formemptData);
      if (validations()) {
        if (isNew) {
          const podvalues = {
            podAnchor: dataObject.podAnchor,
            podName: dataObject.podName,
            anchorName: dataObject.anchorName,
            client: dataObject.client,
            accountAnchor: dataObject.accountAnchor,
            tech: dataObject.tech,
            location: dataObject.location,
            status: "Active",
            joinDate: dataObject.joinDate,
            endDate: dataObject.endDate,
          };
          const podDetail = await addPod(podvalues);
          if (podDetail.error === undefined) {
            console.log("pod details", podDetail);
            alert("Add POD Success");
            setPodId(podDetail.podId);
            setEdit(true);
            setIsNew(!isNew);
            setFormPod(podDetail);
          } else if (podDetail.error) {
            alert(podDetail.messages);
          }
        } else if (!isNew) {
          console.log(formPod);
          const editPodres = await editPod(formPod, podId);
          if (editPodres?.data.error === undefined) {
            setEdit(true);
            setFormPod(editPodres.data);
            alert("Pod was successfully updated!");
          } else if (editPodres.data.error) {
            alert(editPodres.data.messages);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleObChange = (e) => {
    setFormPod({ ...formPod, [e.target.name]: e.target.value });
  };

  const cancelAction = () => {
    setEdit(true);
  };

  const handleOnclick = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "You are going to change the  status of this pod" +
          ", do you want to continue with the process?"
      )
    ) {
      const podresp = await changeStatusPod(podId);
      setFormPod(podresp.data);
      alert("POD status has change");
      setEdit(!edit);
    }
  };

  const getPod = async () => {
    try {
      if (role === "EMPLOYEE") {
        setisAdmin(false);
      }
      if (podData) {
        setPodId(podData.podId);
        setFormPod(podData);
        setEdit(true);
        setIsNew(false);
      } else if (params.podId === "0") {
        setIsNew(true);
        setEdit(false);
        setPodId(0);
        setFormPod({
          podAnchor: "",
          podName: "",
          anchorName: "",
          client: "",
          accountAnchor: "",
          tech: "",
          location: "",
          status: "",
          joinDate: "",
          endDate: "",
        });
      } else {
        const id = params.podId.toString();
        setIsNew(false);
        const podresp = await getpodData(id);
        if (podresp) {
          setPodId(podresp.podId);
          setFormPod(podresp);
          setEdit(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showUserAssignation = () => {
    navigate(`/userAssignation/${podId}`);
  };

  useEffect(() => {
    getPod();
  }, []);
  return (
    <>
      <div className="profile-wrapper">
        {!isNew ? (
          <div className="Profile-Navigation">
            <Button
              className="prof-link"
              variant="link"
              onClick={showUserAssignation}
            >
              User Assignation
            </Button>
          </div>
        ) : (
          <></>
        )}

        <div className="empDetails-container">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h2> POD Details </h2>
            </Col>
          </Row>
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>POD Number </Form.Label>
                  <Form.Control
                    type="text"
                    name="podName"
                    value={podId}
                    disabled={true}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>POD Name </Form.Label>
                  <Form.Control
                    type="text"
                    name="podName"
                    value={formPod.podName}
                    disabled={edit}
                    maxLength={50}
                    required
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Client/Account Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="client"
                    maxLength={50}
                    disabled={edit}
                    value={formPod.client}
                    onChange={handleObChange}
                    class="form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Account Anchor</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountAnchor"
                    maxLength={50}
                    disabled={edit}
                    value={formPod.accountAnchor}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Pod Anchor</Form.Label>
                  <Form.Control
                    type="text"
                    name="podAnchor"
                    pattern=".{8,10}"
                    value={formPod.podAnchor}
                    disabled={edit}
                    required
                    maxLength={10}
                    onChange={handleObChange}
                    class="form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 4 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Anchor Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="anchorName"
                    disabled={true}
                    maxLength={50}
                    value={formPod.anchorName}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    disabled={edit}
                    maxLength={50}
                    value={formPod.location}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joinDate"
                    disabled={edit}
                    value={formPod.joinDate}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>

              <Col md={{ span: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    disabled={edit}
                    value={formPod.endDate}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Technology</Form.Label>
                  <Form.Control
                    type="text"
                    name="tech"
                    as="textarea"
                    rows={3}
                    disabled={edit}
                    value={formPod.tech}
                    maxLength={500}
                    onChange={handleObChange}
                  />
                </Form.Group>
              </Col>
              <Col md={{ span: 4 }}>
                {isNew ? (
                  <></>
                ) : (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <div>
                      <Fragment>
                        <label class="switch" name="status">
                          <input
                            type="checkbox"
                            disabled={edit}
                            checked={
                              formPod.status === "Inactive" ? false : true
                            }
                            onClick={handleOnclick}
                          />
                          <span class="slider round"></span>
                        </label>
                        <Form.Label>{formPod.status}</Form.Label>
                      </Fragment>
                    </div>
                  </Form.Group>
                )}
              </Col>
            </Row>
            {console.log("value admin", isAdmin)}
            {isAdmin ? (
              <Row>
                {!edit ? (
                  <Col md={{ span: 2, offset: 2 }}>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                ) : (
                  <></>
                )}
                {edit && isAdmin ? (
                  <>
                    <Col md={{ span: 2, offset: 6 }}>
                      <Button variant="primary" onClick={() => handleedit()}>
                        Edit
                      </Button>
                    </Col>
                    <Col md={{ span: 2 }}>
                      <Button variant="primary" onClick={() => addNewForm()}>
                        Clear Form
                      </Button>
                    </Col>
                  </>
                ) : (
                  <Col md={{ span: 2 }}>
                    <Button variant="primary" onClick={() => cancelAction()}>
                      Cancel
                    </Button>
                  </Col>
                )}
              </Row>
            ) : (
              <></>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default PodEditView;
