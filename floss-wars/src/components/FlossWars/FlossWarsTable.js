import React from "react";

const FlossWarsTable = ({ duration, morningCount, nightCount }) => {
  const tableRows = [];
  for (let day = 1; day <= duration; day++) {
    tableRows.push(
      <tr key={day}>
        <td>{`Day ${day}`}</td>
        <td>{morningCount >= day ? "Flossed" : "Not Flossed"}</td>
        <td>{nightCount >= day ? "Flossed" : "Not Flossed"}</td>
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Morning</th>
          <th>Night</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default FlossWarsTable;
