// Overview.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Score from "../components/Score";
import TaskList from "../components/TaskList";
import RoutineSelector from "../components/RoutineSelector";

const Overview = ({
  score,
  tasks,
  taskIndex,
  onTaskComplete,
  onTaskSkip,
}) => {
  return (
    <View style={styles.container}>
      <Score score={score} />
      <TaskList
        tasks={tasks}
        taskIndex={taskIndex}
        onTaskComplete={onTaskComplete}
        onTaskSkip={onTaskSkip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Overview;
