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
  const { taskLists, tasks, selectRoutine, loading, error } =
    useFirebaseTaskLists();

  const { fetchPerformance, savePerformance } = useTaskPerformance(user.uid);
  const validateUpdate = useCallback((task, pointsUpdateKey) => {
    if (!task) throw new Error("Current task is invalid or undefined.");
    if (!["completed", "skipped"].includes(pointsUpdateKey))
      throw new Error("Invalid pointsUpdateKey:", pointsUpdateKey);
  }, []);

  const getUpdatedPerformance = useCallback(
    async (id) => {
      const currentPerformance = (await fetchPerformance(id)) || {
        completed: 0,
        skipped: 0,
      };
      currentPerformance.completed = currentPerformance.completed || 0;
      currentPerformance.skipped = currentPerformance.skipped || 0;
      return currentPerformance;
    },
    [fetchPerformance]
  );

  const handlePerformanceUpdate = useCallback(
    async (pointsUpdateKey) => {
      console.log(
        "[Lifelo] Handling performance update. Action:",
        pointsUpdateKey
      );

      const task = tasks[taskIndex];
      validateUpdate(task, pointsUpdateKey);

      const { id, points } = task;

      try {
        const currentPerformance = await fetchPerformance(id);
        console.log(
          "[Lifelo] Current performance data:",
          JSON.stringify(currentPerformance)
        );

        const updatedPoints = currentPerformance[pointsUpdateKey] + 1;
        await savePerformance(id, pointsUpdateKey, updatedPoints);

        // Use the locally computed updatedPoints for score calculation
        const updatedPerformance = {
          ...currentPerformance,
          [pointsUpdateKey]: updatedPoints,
        };

        const updatedScore = calculateScore(
          updatedPerformance.completed,
          updatedPerformance.skipped
        );

        console.log("[Lifelo] Updated score:", updatedScore);
        updateScore(updatedScore);

        setTaskIndex((prevIndex) =>
          prevIndex < tasks.length - 1 ? prevIndex + 1 : 0
        );
      } catch (err) {
        console.error(
          "[Lifelo] Error updating the task performance:",
          err.message
        );
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
