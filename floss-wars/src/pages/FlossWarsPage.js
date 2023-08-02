import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, database } from "../firebase";
import { onValue, off } from "firebase/database";
import FlossWarsHeader from "../components/FlossWars/FlossWarsHeader";
import FlossWarsStatus from "../components/FlossWars/FlossWarsStatus";
import FlossWarsButton from "../components/FlossWars/FlossWarsButton";
import FlossWarsTable from "../components/FlossWars/FlossWarsTable";

const FlossWarsPage = () => {
  const { challengeId } = useParams();
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const challengeRef = ref(database, `challenges/${challengeId}`);
    onValue(challengeRef, (snapshot) => {
      setChallengeData(snapshot.val());
      setLoading(false);
    });

    return () => {
      off(challengeRef);
    };
  }, [challengeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { players, duration, morningCount, nightCount } = challengeData;

  return (
    <div>
      <h2>Floss Wars Page</h2>
      <FlossWarsHeader players={players} />
      <FlossWarsStatus duration={duration} />
      <FlossWarsButton
        challengeId={challengeId}
        currentPlayerId="YOUR_CURRENT_PLAYER_ID" // Replace with the current user's ID
        morningCount={morningCount}
        nightCount={nightCount}
      />
      <FlossWarsTable duration={duration} morningCount={morningCount} nightCount={nightCount} />
    </div>
  );
};

export default FlossWarsPage;
