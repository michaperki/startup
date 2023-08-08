// TaskList.js
import React, { Component } from "react";
import { View, Text } from "react-native";
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
          onSkip={onTaskSkip} // Pass down the onSkip prop
        />
      </View>
    );
  }
}

export default TaskList;
