import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import TaskButton from "./TaskButton";
class TaskList extends Component {
  render() {
    const { tasks, taskIndex, onTaskComplete, onTaskSkip } = this.props;

    if (!tasks) {
      return <Text>Loading...</Text>;
    }

    const task = tasks[taskIndex];
    return (
      <View>
        <TaskButton
        task={task}
        onComplete={onTaskComplete}
        />
      </View>
    );
  }
}

export default TaskList;
