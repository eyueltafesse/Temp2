import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { addCatalog } from "../../Services/ServiceTraining";
const Catalog = (props) => {
  const [catalogForm, setCatalogForm] = useState({
    type: "",
    filterType: "",
    name: "",
    duration: "",
    link: "",
  });

  const handleonChange = (e) => {
    setCatalogForm({ ...catalogForm, [e.target.name]: e.target.value });
  };
  const newCatalogTC = async (e) => {
    e.preventDefault();
    try {
      const respadd = await addCatalog(catalogForm);
      if (respadd?.data) {
        alert("Saved Successfully");
        setCatalogForm({
          type: "",
          filterType: "",
          name: "",
          duration: "",
          link: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cancelForgotPw = async () => {
    setCatalogForm({
      type: "",
      filterType: "",
      name: "",
      duration: "",
      link: "",
    });
    props.onHide(false);
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Training or Certification Catalog
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={newCatalogTC}>
          <Modal.Body className="show-grid">
            <Row>
              <Col className="lm-qus" md={5}>
                Name:
              </Col>
              <Col md={7}>
                <Form.Control
                  className="form-control form-control-sm"
                  required
                  type="text"
                  maxLength={100}
                  value={catalogForm.name}
                  onChange={handleonChange}
                  name="name"
                />
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Filter:
              </Col>
              <Col md={7}>
                <select
                  className="form-control form-control-sm"
                  name="filterType"
                  required
                  value={catalogForm.filterType}
                  onChange={handleonChange}
                >
                  <option value="0">Select Filter Type</option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Link:
              </Col>
              <Col md={7}>
                <Form.Control
                  className="form-control form-control-sm"
                  type="text"
                  value={catalogForm.link}
                  onChange={handleonChange}
                  required
                  name="link"
                />
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Type:
              </Col>
              <Col md={7}>
                <Form.Control
                  className="form-control form-control-sm"
                  type="text"
                  name="type"
                  maxLength={50}
                  value={catalogForm.type}
                  onChange={handleonChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col className="lm-qus" md={5}>
                Duration:
              </Col>
              <Col md={7}>
                <Form.Control
                  className="form-control form-control-sm"
                  type="text"
                  maxLength={5}
                  value={catalogForm.duration}
                  onChange={handleonChange}
                  required
                  name="duration"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Col md={2}>
              <Button type="submit">Save</Button>
            </Col>
            <Col md={4}>
              <Button onClick={cancelForgotPw}>Cancel</Button>
            </Col>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Catalog;
