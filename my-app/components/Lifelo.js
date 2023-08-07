import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";

import { useFirebaseScore, useFirebaseTaskLists } from "../hooks/useFirebase";
import { useUser } from "../contexts/UserContext";

import NavMenu from "./NavMenu";
import useTaskPerformance from "../hooks/useTaskPerformance";
import useViewRenderer, { VIEW_TYPES } from "../hooks/useViewRenderer";

import { calculateScore } from "../utils/scoring";

const Lifelo = () => {
  const [view, setView] = useState(VIEW_TYPES.OVERVIEW);
  const [taskIndex, setTaskIndex] = useState(0);

  const { user } = useUser();
  const { score, updateScore } = useFirebaseScore(user.uid);
  console.log(`score:`, score); // This will log the score object.
  const { taskLists, tasks, selectRoutine, loading, error } =
    useFirebaseTaskLists();

  const { fetchPerformance, savePerformance } = useTaskPerformance(user.uid);

  const handlePerformanceUpdate = useCallback(
    async (pointsUpdateKey) => {
      const task = tasks[taskIndex];
      if (!task) {
        console.error("Current task is invalid or undefined.");
        return;
      }

      if (!["completed", "skipped"].includes(pointsUpdateKey)) {
        console.error("Invalid pointsUpdateKey:", pointsUpdateKey);
        return;
      }

      const { id, points } = task;

      try {
        const currentPerformance = (await fetchPerformance(id)) || {
          completed: 0,
          skipped: 0,
        };

        // if either completed or skipped is undefined, set it to 0
        if (currentPerformance.completed === undefined) {
          currentPerformance.completed = 0;
        }
        if (currentPerformance.skipped === undefined) {
          currentPerformance.skipped = 0;
        }

        console.log(`currentPerformance for task ${id}:`, currentPerformance); // This will show the current performance for the task.
        console.log(`pointsUpdateKey:`, pointsUpdateKey); // This will log the pointsUpdateKey.
        console.log(
          `Value to update:`,
          currentPerformance[pointsUpdateKey] + 1
        ); // This will log the value you're trying to save.

        const updatedPoints = currentPerformance[pointsUpdateKey] + 1;

        console.log(`updatedPoints:`, updatedPoints); // This will log the updated points.
        await savePerformance(
          id,
          pointsUpdateKey,
          currentPerformance[pointsUpdateKey] + 1
        );

        const updatedScore = calculateScore(
          currentPerformance.completed,
          currentPerformance.skipped
        );

        updateScore(updatedScore);
        setTaskIndex((prevIndex) =>
          prevIndex < tasks.length - 1 ? prevIndex + 1 : 0
        );
      } catch (err) {
        console.error("Error updating the task performance:", err);
      }
    },
    [tasks, taskIndex, fetchPerformance, user.uid]
  );

  const renderContent = useViewRenderer(
    view,
    loading,
    error,
    score,
    taskLists,
    tasks,
    taskIndex,
    handlePerformanceUpdate,
    selectRoutine
  );

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <NavMenu onSelect={setView} />
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuContainer: {
    marginTop: 100,
  },
});

export default Lifelo;
