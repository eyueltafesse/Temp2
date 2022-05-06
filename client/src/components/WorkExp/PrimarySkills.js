import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { addPrimarySkills, deletePrimarySkills, getPrimarySkills } from "../../Services/ServicePrimarySkills";
import { Alert } from "react-bootstrap";
import { Input } from "@mui/material";

const PrimarySkills = ({empId}) => {
    const params = useParams();
    const [eMessage, setEMessage] = useState("")
    const [hasMessage, setHasMessage] = useState(false);
    const [primarySkill, setPrimarySkill] = useState({
        empId: params.empId,
        employeeEmpId: params.empId,
        primarySkills: "",
        totalYearsWorked: "",
    });
    const [primarySkills, setPrimarySkills] = useState([]); 
    const [hasSkill, setHasSkill] = useState(false);

    const handleObChange = (e) => {
        setPrimarySkill({ ...primarySkill, [e.target.name]: e.target.value })
    }
    const getSkills = async () => {
        const data = await getPrimarySkills(params.empId);
        if (data.data !== undefined) {
            setPrimarySkills(data.data)
            console.log(primarySkills);
            setHasSkill(true);
        } 
    }
    const validYears = () => {
        if (primarySkill.totalYearsWorked > 50 || primarySkill.totalYearsWorked < 0) {
            setEMessage("Experience must be between 50 and 0")
            return false;
        } else {
            return true;
        }
    }
    const handleOnSubmit = async ()  => {
        try{
            if (validYears()) {
                setPrimarySkill(primarySkill)
                const newSkill = await addPrimarySkills(params.empId, primarySkill);
                if (newSkill !== undefined) {
                    getSkills()
                }
                setHasMessage(false);
                return newSkill;
            } else {
                setEMessage("Experience must be between 50 and 0");
                setHasMessage(true);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const deleteSkill = async (id) => {
        const data = await deletePrimarySkills(id);
        getSkills();
        return data;
    }
    useEffect(() => {
        if (params.empId !== undefined) {  
            getSkills();
        }
    }, [] );

    return (
        <Table striped bordered>
          {hasMessage &&
              <Alert variant="danger" style={{ width: "42rem" }}>
                <Alert.Heading>
                    {eMessage}
                </Alert.Heading>
              </Alert>
          }
        <thead>
            <tr>
                <td>Primary Skill</td>
                <td>Years of experience</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {hasSkill === true &&
            primarySkills.map((s) => (
                <tr key={s.id}>
                    <td>{s.primarySkills}</td>
                    <td>{s.totalYearsWorked}</td>
                    <td>
                    <Button className="footer-btn" variant="danger" onClick={(e) => deleteSkill(s.id)}>
                        Remove
                    </Button>
                    </td>
                </tr>
                ))
            }
            <tr key={primarySkill.id}>
                <td>
                    <input
                    type="text"
                    name="primarySkills"
                    value={primarySkill.primarySkills}
                    onChange={handleObChange}
                    />
                </td>
                <td>
                    <input
                    type="text"
                    name="totalYearsWorked"
                    value={primarySkill.totalYearsWorked}
                    onChange={handleObChange}
                    />
                </td>
                <td>
                    <Button className="footer-btn" variant="info" onClick={(() => handleOnSubmit({primarySkill}))}>
                        Confirm
                    </Button>
                </td>
            </tr>
        </tbody>
    </Table>
    )
} 

export default PrimarySkills;