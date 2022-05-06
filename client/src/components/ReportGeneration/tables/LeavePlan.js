import React from "react";
import "../../Search/Search.css";
import "../ReportGeneration.css";

export const LeavePlan = ({ listemp }) => {
    return (
        <div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Reason For Leave</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Days On Leave</th>
                            <th>Authorization Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Needs the correct data */}
                        {listemp.map((employees) => (
                            <tr key={employees.empId}>
                                <td className="table-data">{employees.empId}</td>
                                <td className="table-data">{employees.name}</td>
                                <td className="table-data">{employees.infosysEmailId}</td>
                                <td className="table-data">{employees.phoneNumber}</td>
                                <td className="table-data">{employees.jobLevel}</td>
                                <td className="table-data">{employees.role}</td>
                                <td className="table-data">{employees.joinDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  );
};

