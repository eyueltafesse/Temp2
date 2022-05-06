import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./Work.css"
import AddWork from "./AddWork";
import { getWorkExp } from "../../Services/ServiceWorkExp";
import { render } from "react-dom";
import { addPrimarySkills, getPrimarySkills } from "../../Services/ServicePrimarySkills";
import { getEmployeeData } from "../../Services/ServiceEmployee";

// renders employees work exp details, read only or empty form: David
const ViewWork = ({empId}) => {
    const params = useParams();
    const navigate = useNavigate();
    // flag for work exp
    const [noWorkExp, setNoWorkExp] = useState(false);
    // flag confirming primary skill exists
    const [emp, setEmp] = useState({
        id: params.empId,
        name: ""
    })
    const [workexp, setWorkExp] = useState({
        totalYearsOfExperience: "",
        totalYearsOfExperienceInInfosys: "",
        totalYearsOfExperienceOutsideInfosys: "",
    });
    const [primarySkill, setPrimarySkill] = useState([{
        primarySkills: "",
        totalYearsWorked: "",
    }])
    const [hasSkill, setHasSkill] = useState(false);
    
    const getEmp = async () => {
        try {
            console.log(params.empId)
            if (params.empId == localStorage.getItem("empId")) {
                emp.name = localStorage.getItem("empName");
            } else {
                const empData = await getEmployeeData(params.empId);
                setEmp({name: empData.data.name});
                console.log(emp.name)
                return empData.data.name;
            }
        } catch (e) {
            console.log(e);
        }
    }
    // if employee does not have work experience, display button Add Workexp: David
    const getWork = async () => {
        try { 
            const workData = await getWorkExp(params.empId);
            if (workData.data == false || workData.data == undefined) {
                setNoWorkExp(true);
            } else {
                setWorkExp(workData.data);
                workData.name = getEmp()
                console.log("workData.name = ", workData.name)
                return workData;
            }
        } catch (e) {
            console.error(e);
        }
    }
    const getSkills = async () => {
        const data = await getPrimarySkills(params.empId);
        if (data.data !== undefined) {
            setHasSkill(true);
            setPrimarySkill(data.data)
            return primarySkill
        } else {
            return []
        }
    }
    // navigate to edit page: David
    const navigateToEdit = (e) => {
        navigate(`/workexp/${params.empId}/edit`)
    }
    const navigateToEmp = () => {
        navigate(`/employeeDetails/${params.empId}`)
      }
    useEffect(() =>  {
        if (params.empId !== undefined) {
            getWork(params.empId);
            getSkills();
        } 
    },[]);
    if (noWorkExp == true) {
        return (
            <AddWork />
        )
    }
    // Read only view: David
    return (
        <div class="work-container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Work Experience Details</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{emp.name}</td>
                    </tr>
                    <tr>
                        <td>Employee ID</td>
                        <td>{params.empId}</td>
                    </tr>
                    <tr>
                        <td>Total Years of Experience</td>
                        <td>{workexp.totalYearsOfExperience}</td>
                    </tr>
                    <tr>
                        <td>Total Years of Experience at Infosys</td>
                        <td>{workexp.totalYearsOfExperienceInInfosys}</td>
                    </tr>
                    <tr>
                        <td>Total Years of Experience Outside Infosys</td>
                        <td>{workexp.totalYearsOfExperienceOutsideInfosys}</td>
                    </tr>
                </tbody>
            </Table>
                <h2>Primary Skills</h2>
            <Table>
                <thead>
                    <tr>
                        <td>Skill</td>
                        <td>Years of Experience</td>
                    </tr>
                </thead>
                <tbody>
                    {primarySkill.map((skill) => (
                        <tr key={skill.id}>
                            <td>{skill.primarySkills}</td>
                            <td>{skill.totalYearsWorked}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* link to edit form: David */}
            <Col md={{ span: 2 }}>
                <Button className="footer-btn" onClick={navigateToEdit} variant="info">Edit</Button>
            </Col>
            <Col md={{ span: 2 }}>
                <Button className="footer-btn" variant="info"onClick={ navigateToEmp } >View Profile</Button>
            </Col>
        </div>
    )
}
export default ViewWork;