import React from "react";
import "../../Search/Search.css";
import "../ReportGeneration.css";

export const EmployeeDetails = ({ props, listemp }) => {
    return (
        <div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Infosys Email</th>
                            <th>Phone</th>
                            <th>Job Level</th>
                            <th>Role</th>
                            <th>Infosys Joining Date</th>
                            <th>Current Location</th>
                            <th>POD</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listemp.map((employees) => (
                            <tr key={employees.empId}>
                                <td className="table-data">{employees.empId}</td>
                                <td className="table-data">{employees.name}</td>
                                <td className="table-data">{employees.infosysEmailId}</td>
                                <td className="table-data">{employees.phoneNumber}</td>
                                <td className="table-data">{employees.jobLevel}</td>
                                <td className="table-data">{employees.role}</td>
                                <td className="table-data">{employees.joinDate}</td>
                                <td className="table-data">{employees.currentLocation}</td>
                                <td className="table-data">{employees.pods.map(pod => pod.podId)}</td>
                                <td className="table-data">{employees.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  );
};
