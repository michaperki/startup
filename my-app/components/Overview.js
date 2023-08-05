// Overview.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Score from "./Score";
import TaskList from "./TaskList";
import RoutineSelector from "./RoutineSelector";

const Overview = ({
  score,
  prevScore,
  updateScore,
  tasks,
  onTaskComplete,
  onTaskSkip,
  taskIndex,
  taskLists,
}) => {
  if (!tasks) {
    return null; // or return a loading spinner
  }
  return (
    <View style={styles.scoreContainer}>
      <Score score={score} prevScore={prevScore} />

      <View style={styles.taskContainer}>
        {tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            onTaskComplete={onTaskComplete}
            onTaskSkip={onTaskSkip}
            taskIndex={taskIndex}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  taskContainer: {
    marginTop: -250,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Overview;
