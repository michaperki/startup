// Task.js
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskButton from "./TaskButton";

const Task = ({ task, onTaskComplete, onTaskSkip }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.buttonContainer}>
        <TaskButton title="Skip" onPress={onTaskSkip} />
        <TaskButton title="Complete" onPress={onTaskComplete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  description: {
    fontSize: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Task;

