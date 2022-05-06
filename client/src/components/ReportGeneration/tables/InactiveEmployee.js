import React from "react";
import "../../Search/Search.css";
import "../ReportGeneration.css";

export const InactiveEmployee = ({ listemp }) => {
    return (
        <div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Total Years Exp</th>
                            <th>Total Years Exp (In Infosys)</th>
                            <th>Total Years Exp (Outside Infosys)</th>
                            <th>Primary Skills (Total Years)</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  );
};

