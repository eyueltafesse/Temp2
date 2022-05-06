import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { searchAll } from "../../Services/ServiceEmployee";
import { EmployeeDetails } from "./tables/EmployeeDetails"
import { WorkExperience } from "./tables/WorkExperience"
import { TrainingCert } from "./tables/TrainingCert"
import { LeavePlan } from "./tables/LeavePlan"
import { InactiveEmployee } from "./tables/InactiveEmployee"
import {FilterReportGeneration} from "./FilterReportGeneration";
import "./ReportGeneration.css"

const ReportGeneration = () => {
  const [employees, setEmployees] = useState([]);
  const [tableValue, setTableValue] = useState('Employee Details');

  const getRadioValue = (value) => {
    setTableValue(value);
  }

  const getTable = (value) => {
    switch (value) {
      case 'Employee Details':
        return <EmployeeDetails listemp={employees}/>;
      case 'Work Experience':
        return <WorkExperience listemp={employees} />;
      case 'Training & Certifications':
        return <TrainingCert listemp={employees}/>;
      case 'Leave Plan':
        return <LeavePlan listemp={employees}/>
      case 'Inactive Employee':
        return <InactiveEmployee listemp={employees}/>
      case 'None':
        return '';
      case null:
        return <EmployeeDetails listemp={employees}/>;
      default:
        return <EmployeeDetails listemp={employees}/>;
    }
  }

  const getAll = async () => {
    const allemp = await searchAll();
    setEmployees(allemp.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div class="search-container">
      <Container>
        <Row>
        <span className="header"><h2> Report Generation </h2></span>
          <Col>
            <FilterReportGeneration getTableValue={(value) => getRadioValue(value)}/>
          </Col>
          <Col>
            <Form>
              <Row>
                <Col lg={{ span: 12 }}>
                  <Form.Group className="mb-3" controlId="employeeId">
                    <Form.Control type="text" size="7" name="empId" value={tableValue}/>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <div className="employee-list">
            {getTable(tableValue)}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportGeneration;
