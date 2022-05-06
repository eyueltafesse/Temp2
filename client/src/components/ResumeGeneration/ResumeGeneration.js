import React, { useContext, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import "./ResumeGeneration.css";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getEmployeeData } from "../../Services/ServiceEmployee";
import { getPrimarySkills } from "../../Services/ServicePrimarySkills";
import { getallTrainingbyEmployee } from "../../Services/ServiceTraining";
import ResumeShare from "./ResumeShare";

const ResumeGeneration = () => {
    const empId = sessionStorage.getItem("empId");

    const [listData, setListData] = useState([]);
    const [isShareShowing, setShare] = useState(false);
    const [empData, setEmpData] = useState({
        empId: '',
        infosysEmailId: '',
        name: ''
    });

    const [primarySkill, setPrimarySkill] = useState([{
        primarySkills: "",
        totalYearsWorked: "",
    }])
  
    const getEmployee = async () => {
        try {
            const empresp = await getEmployeeData(empId);
              if(empresp.data) {
                setEmpData(empresp.data);
              }
              console.log('hello', empresp);
          } catch (e) {
            console.error(e);
          }
    };

    const getSkills = async () => {
        const data = await getPrimarySkills(empId);
        if (data.data !== undefined) {
            setPrimarySkill(data.data)
        }
    }

    const getTrainingbyEmployee = async () => {
        try {
          const respTandC = await getallTrainingbyEmployee(empId);
          console.log("print result", respTandC.data, empId);
    
          if (respTandC?.data !== []) setListData(respTandC.data);
        } catch (e) {
          console.error(e);
        }
      };
    
    const onShare = () => {
        setShare(true);
    } 

    const onDownload = () => {
        const printDiv = document.getElementById('printToPdf');
        console.log('download', printDiv);
        let width = printDiv.clientWidth;
        let height = printDiv.clientHeight;
        html2canvas(printDiv)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', [300, 300]);
            pdf.addImage(imgData, 'JPEG', 10, 0, 210, 297);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
        });
    }

    const handleResumeShare = (evt) => {
        setShare(evt);
        console.log('handle resume share', evt, isShareShowing);
    }
    
    useEffect(()=> {
        getEmployee();
        getSkills();
        getTrainingbyEmployee();
    }, []);
    return (
    <div className="generation-wrapper">
        <div id="printToPdf">
            <Row>
                <Col className="podMembertitle">
                <h3> Resume </h3>
                </Col>
            </Row>
            <Form>
                <Row>
                    <Col md={{ span: 4 }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control type="Text" value={empData.empId} disabled={true} />
                        </Form.Group>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="Text" value={empData.name} disabled={true} />
                        </Form.Group>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="Text" value={empData.infosysEmailId} disabled={true} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col md={{span: 6}}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Primary Skills</th>
                                <th>Total Years Worked</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Business Analysis</td>
                                <td>8</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Access Level</th>
                                <th>Name</th>
                                <th>Duration</th>
                                <th>Link</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData.map((training) => (
                                <tr key={training.id}>
                                    <td>{training?.certification?.type} </td>
                                    <td>{training?.certification?.filterType} </td>
                                    <td>{training?.certification?.name} </td>
                                    <td>{training?.certification?.duration} </td>
                                    <td>
                                    <a href={training?.certification?.link} target="_blank">
                                        Go...
                                    </a>{" "}
                                    </td>
                                    <td>{training.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
        <Row>
        <Col md={{span: 2, offset: 9 }}>
                <Button onClick={onDownload}>Download</Button>
            </Col>
            <Col md={{span: 1}}>
                <Button onClick={onShare}>Share</Button>
            </Col>
        </Row>
        {
            isShareShowing ? (<Row>
                <ResumeShare isShareShowing={isShareShowing}  handleResumeShare={handleResumeShare} />
            </Row>) : (<></>)
        }
    </div>
  );
};

export default ResumeGeneration;
