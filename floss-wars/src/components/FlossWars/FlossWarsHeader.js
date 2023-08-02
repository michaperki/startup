import React from "react";

const FlossWarsHeader = ({ players }) => {
  if (!players || players.length === 0) {
    return <div>Loading players...</div>;
  }
  return (
    <div>
      <h3>Players:</h3>
      <ul>
        {players.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlossWarsHeader;
