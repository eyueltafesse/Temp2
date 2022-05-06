import React from "react";

const TrainingDisplay = ({ listData }) => {
  return (
    <>
      <Col>
        <Table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Type</th>
              <th>Filter</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Link</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {listData !== [] ? (
            <tbody>
              {listData.map((training) => (
                <tr key={training.id}>
                  <td>{training.certification.type} </td>
                  <td>{training.certification.filterType} </td>
                  <td>{training.certification.name} </td>
                  <td>{training.certification.duration} </td>
                  <td>
                    <a href={training.certification.link} target="_blank">
                      Go...
                    </a>{" "}
                  </td>
                  <td>{training.status}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </Table>
      </Col>
    </>
  );
};
