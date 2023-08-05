// Task.js
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Task = ({ task, onComplete, onSkip }) => (
  <View style={styles.task}>
    <Text style={styles.taskText}>{task.description}</Text>
    <TouchableOpacity onPress={onComplete}>
      <Text style={styles.button}>Complete</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onSkip}>
      <Text style={styles.button}>Skip</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  task: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  taskText: {
    fontSize: 20,
  },
  button: {
    fontSize: 20,
    color: "blue",
    margin: 10,
  },
});

export default Task;
