// Overview.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Score from "../components/Score";
import TaskList from "../components/TaskList";
import RoutineSelector from "../components/RoutineSelector";
import PropTypes from "prop-types";

const Overview = ({ score, tasks, taskIndex, onTaskComplete, onTaskSkip }) => {
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

Overview.propTypes = {
  score: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired, // Assuming tasks is an array of objects
  taskIndex: PropTypes.number.isRequired,
  onTaskComplete: PropTypes.func.isRequired,
  onTaskSkip: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Overview;
