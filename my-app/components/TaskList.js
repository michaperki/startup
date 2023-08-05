import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class TaskList extends Component {
  render() {
    const { tasks, taskIndex, onTaskComplete, onTaskSkip } = this.props;    

    console.log("tasks", tasks)

    if (!tasks || tasks.length === 0) {
      return <Text>No tasks</Text>;
    }

    console.log("taskIndex", taskIndex)
    console.log("tasks", tasks)

    const task = tasks[taskIndex];

    console.log("task", task)

    return (
      <View>
        <Text>{task.description}</Text>
        <Button title="Complete" onPress={() => onTaskComplete(task)} />
        <Button title="Skip" onPress={() => onTaskSkip(task)} />
      </View>
    );
  }
}


export default TaskList;
