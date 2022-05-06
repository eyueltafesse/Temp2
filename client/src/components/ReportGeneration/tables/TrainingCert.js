import React from "react";
import "../../Search/Search.css";
import "../ReportGeneration.css";

export const TrainingCert = ({ listemp }) => {
    return (
        <div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Trainings Attended</th>
                            <th>Certifications</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  );
};

