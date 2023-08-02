// Dashboard.js
import React, { useState, useEffect } from "react";
import app, { auth, database, ref, set, push } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import ChallengeModal from "./ChallengeModal";
import { off, onValue, update, get } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingChallenges, setPendingChallenges] = useState([]);

  useEffect(() => {
    // Get the current user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Fetch the current user's streak from the database and update setCurrentUserStreak()
      // TODO: Implement the logic to fetch and update the user's streak
    }
    // TODO: Fetch the opponent's streak from the database and update setOpponentStreak()

    // Fetch pending challenges where the current user is the opponent
    const challengesRef = ref(database, "challenges");
    onValue(challengesRef, (snapshot) => {
      const challenges = snapshot.val();
      const pendingChallengesList = [];
      for (let key in challenges) {
        const challenge = challenges[key];
        if (
          challenge.opponent === currentUser.uid &&
          challenge.status === "pending"
        ) {
          pendingChallengesList.push(challenge);
        }
      }
      setPendingChallenges(pendingChallengesList);
    });

    // Clean up the listener on unmount
    return () => {
      off(challengesRef);
    };
  }, [currentUser]);

  const handleChallenge = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleCreateChallenge = (
    challengeName,
    challengeDuration,
    selectedOpponent
  ) => {
    // create a new challenge in the database
    const newChallenge = {
      id: uuidv4(),
      name: challengeName,
      duration: challengeDuration,
      createdAt: serverTimestamp(),
      createdBy: currentUser.uid,
      opponent: selectedOpponent,
      status: "pending",
      winner: null,
    };

    const challengeRef = push(ref(database, "challenges"), newChallenge);
    const challengeId = challengeRef.key;

    // Update the current user's challenges
    set(ref(database, `users/${currentUser.uid}/challenges/${challengeId}`), {
      id: challengeId,
      status: "pending",
    });

    // Close the modal
    setShowModal(false);
  };

  const handleAcceptChallenge = (challengeId) => {
    // get the challenge from the database
    const challengeRef = ref(database, `challenges/${challengeId}`);
    get(challengeRef).then((snapshot) => {
      const challenge = snapshot.val();
      const acceptedChallenge = {
        ...challenge,
        status: "accepted",
      };
      set(challengeRef, acceptedChallenge);
    });

    // Update the current user's challenges
    set(ref(database, `users/${currentUser.uid}/challenges/${challengeId}`), {
      id: challengeId,
      status: "accepted",
    });
  };

  const handleRejectChallenge = (challengeId) => {
    // get the challenge from the database
    const challengeRef = ref(database, `challenges/${challengeId}`);
    get(challengeRef).then((snapshot) => {
      const challenge = snapshot.val();
      const rejectedChallenge = {
        ...challenge,
        status: "rejected",
      };
      // Update the challenge status to "rejected" in the database
      update(ref(database, `challenges/${challengeId}`), rejectedChallenge);
    });

    // Update the current user's challenges
    set(ref(database, `users/${currentUser.uid}/challenges/${challengeId}`), {
      id: challengeId,
      status: "rejected",
    });
  };
  return (
    <div>
      <h2>Welcome, {currentUser ? currentUser.email : "Guest"}</h2>
      <button onClick={handleChallenge}>Challenge</button>
      <button onClick={handleLogout}>Logout</button>

      {showModal && (
        <ChallengeModal
          onClose={handleCloseModal}
          onCreateChallenge={handleCreateChallenge}
          currentUser={currentUser}
        />
      )}

      <h3>Pending Challenges</h3>
      {pendingChallenges.map((challenge) => (
        <div key={challenge.id}>
          <p>{challenge.duration}</p>
          <p>{challenge.status}</p>
          {/* Add "Accept" and "Reject" buttons */}
          {challenge.status === "pending" && (
            <>
              <button onClick={() => handleAcceptChallenge(challenge.id)}>
                Accept
              </button>
              <button onClick={() => handleRejectChallenge(challenge.id)}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
