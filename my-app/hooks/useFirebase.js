// useFirebase.js
import { useEffect, useState } from "react";
import {
  fetchValueFromRef,
  fetchValueFromRefOnce,
  updateValueAtRef,
  getScoreRef,
  getTaskListsRef,
} from "../services/firebaseService";

export function useFirebaseScore(uid) {
  const [score, setScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        console.log("Fetching score...");
        console.log("Score ref:", getScoreRef(uid));
        const score = await fetchValueFromRefOnce(getScoreRef(uid));
        console.log("Fetched score:", score);
        setScore(score);
      } catch (err) {
        console.error("Error fetching score:", err);
      }
    };

    fetchScore();
  }, [uid]);

  const updateScore = (incrementValue) => {
    setPrevScore(score);
    setScore(score + incrementValue);
    updateValueAtRef(getScoreRef(uid), score + incrementValue);
  };

  return { score, prevScore, updateScore };
}

export function useFirebaseTaskLists() {
  const [taskLists, setTaskLists] = useState({});
  const [tasks, setTasks] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState("morning_routine");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const ref = getTaskListsRef();
        const data = await fetchValueFromRefOnce(ref);

        console.log("Fetched tasks:", data);
        setTaskLists(data);

        if (data[selectedRoutine]) {
          setTasks(data[selectedRoutine].tasks);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    console.log("Fetching tasks...");
    console.log("Selected routine:", selectedRoutine);
    console.log("Task lists:", taskLists);
    console.log("Tasks:", tasks);

    fetchTasks();
  }, [selectedRoutine]); // adding selectedRoutine to the dependency array

  const selectRoutine = (routine) => {
    setSelectedRoutine(routine);
  };

  return { taskLists, tasks, selectRoutine, loading, error };
}
