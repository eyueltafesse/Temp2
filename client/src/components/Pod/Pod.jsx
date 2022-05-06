import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import PodEditView from "./PodEditView";
import { getpodData, getallPods } from "../../Services/ServicePod";
import Select from "react-select";

const Pod = () => {
  const [searchVal, setSearchVal] = useState("");
  const [podData, setPodData] = useState({});
  const [podFound, setPodFound] = useState(false);
  const [podList, setPodList] = useState([]);

  const fetchPODData = async (evt) => {
    evt.preventDefault();
    try {
      setPodFound(false);
      if (searchVal !== "0") {
        const resp = await getpodData(searchVal);
        setPodData(resp);
        setPodFound(true);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const getPodArr = async () => {
    try {
      const respArr = await getallPods();
      console.log("print arr", respArr);
      if (respArr) {
        setPodList(
          respArr.map((pod) => ({ value: pod.podId, label: pod.podName }))
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeComboBox = (e) => {
    setSearchVal(e.value);
  };

  useEffect(() => {
    getPodArr();
  }, []);
  return (
    <>
      <div className="profile-wrapper">
        <div className="training-container">
          <Row className="title">
            <Col md={{ span: 8, offset: 2 }}>
              <h2> POD Record </h2>
            </Col>
          </Row>
          <Row>
            <Form onSubmit={fetchPODData}>
              <Col md={{ span: 5, offset: 4 }}>
                <Form.Group className="mb-3" controlId="employeeId">
                  <Form.Label>POD Search</Form.Label>
                  <Select
                    className="basic-single"
                    isSearchable={true}
                    options={podList}
                    onChange={(e) => {
                      onChangeComboBox(e);
                    }}
                  ></Select>
                </Form.Group>
              </Col>
              <Col md={{ span: 2, offset: 5 }}>
                <Button className="search-btn" type="submit" variant="primary">
                  Go
                </Button>
              </Col>
            </Form>
          </Row>
          <hr />
        </div>
      </div>
      <div className="">
        {podFound ? (
          <Row>
            <Col>
              <PodEditView podData={podData} />
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Pod;
