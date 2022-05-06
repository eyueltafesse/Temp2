import React from "react";
import { Form } from "react-bootstrap";
import "./ReportGeneration.css"

export const FilterReportGeneration = (props) => {

    const handleClick = (event) => {
        props.getTableValue(event.target.value)
    }
    return (
        <div class="search-container">
            <span className="filter-title">Filter Report - Type</span>
            <Form onClick={handleClick}>
                <Form.Check
                    type={'radio'}
                    label="Employee Details"
                    value={'Employee Details'}
                    name="group1"
                    defaultChecked 
                />
                <Form.Check
                    type={'radio'}
                    label="Work Experience"
                    value="Work Experience"
                    name="group1"
                />
                <Form.Check
                    type={'radio'}
                    id={`disabled-default`}
                    label="Training & Certifications"
                    value="Training & Certifications"
                    name="group1"
                />
                <Form.Check
                    type={'radio'}
                    id={`disabled-default`}
                    label="Leave Plan"
                    value="Leave Plan"
                    name="group1"
                />
                <Form.Check
                    type={'radio'}
                    id={`disabled-default`}
                    label="Inactive Employees"
                    value="Inactive Employee"
                    name="group1"
                />
                <Form.Check
                    type={'radio'}
                    id={`disabled-default`}
                    label="None"
                    value="None"
                    name="group1"
                />
            </Form>
        </div>
    );
};

