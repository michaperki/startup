import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Score from "./Score";
import NavMenu from "./NavMenu";
import TaskList from "./TaskList";
import RoutineSelector from "./RoutineSelector";
import Overview from "./Overview";
import Daily from "./Daily";
import { useFirebaseScore, useFirebaseTaskLists } from "../hooks/useFirebase";

const Lifelo = () => {
  const [view, setView] = useState("overview");
  const [routine, setRoutine] = useState("morning_routine");
  const [taskIndex, setTaskIndex] = useState(0);
  
  const { score, prevScore, updateScore } = useFirebaseScore();
  const { taskLists, tasks, selectRoutine } = useFirebaseTaskLists();
  
  const handleNavMenuSelect = (view) => {
    setView(view);
  };

  const handleTaskComplete = ({ points }) => {
    updateScore(points.complete);
    moveToNextTask();
  };

  const handleTaskSkip = ({ points }) => {
    updateScore(points.skip);
    moveToNextTask();
  };

  const handleRoutineChange = (routine) => {
    selectRoutine(routine);
    setRoutine(routine);
  };

  const moveToNextTask = () => {
    setTaskIndex((prevTaskIndex) => (prevTaskIndex + 1) % tasks.length);
  };

  const renderView = () => {
    switch (view) {
      case "overview":
        return (
          <Overview
            score={score}
            prevScore={prevScore}
            tasks={tasks}
            updateScore={updateScore}
            onTaskComplete={handleTaskComplete}
            onTaskSkip={handleTaskSkip}
            taskIndex={taskIndex}
            taskLists={taskLists}
          />
        );
      case "today":
        return (
          <Daily
            routine={routine}
            score={score}
            tasks={tasks}
            taskLists={taskLists}
            onSelect={handleRoutineChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <NavMenu onSelect={handleNavMenuSelect} />
      </View>
      {renderView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuContainer: {
    marginTop: 100,
  },
  scoreContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  taskListContainer: {
    flex: 1,
    marginTop: -350,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Lifelo;
