import React from "react";
import { update } from "firebase/database";
import { ref, database } from "../../firebase";

const FlossWarsButton = ({ challengeId, currentPlayerId, morningCount, nightCount }) => {
  const handleButtonClick = (timeOfDay) => {
    // Determine which count (morning or night) to update based on the timeOfDay parameter
    const countRef = timeOfDay === "morning" ? morningCount : nightCount;
    const count = countRef >= 0 ? countRef + 1 : 1;

    // Update the corresponding count in Firebase
    update(ref(database, `challenges/${challengeId}`), {
      [timeOfDay === "morning" ? "morningCount" : "nightCount"]: count,
    });
  };

  return (
    <div>
      <button onClick={() => handleButtonClick("morning")}>Floss Morning</button>
      <button onClick={() => handleButtonClick("night")}>Floss Night</button>
    </div>
  );
};

export default FlossWarsButton;
