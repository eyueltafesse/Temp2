import React from "react";
import { Link } from "react-router-dom";
import "./Search.css";

const DisplayEmployee = ({ listemp }) => {
  return (
    <div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
              <th>Infosys Email Id</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listemp.map((employees) => (
              <tr key={employees.empId}>
                <td>{employees.empId}</td>
                <td>{employees.name}</td>
                <td>{employees.infosysEmailId}</td>
                <td>{employees.phoneNumber}</td>
                <td>{employees.status}</td>
                <td>
                  <Link
                    to={`/employeeDetails/${employees.empId}`}
                    className="edit-icon"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayEmployee;
