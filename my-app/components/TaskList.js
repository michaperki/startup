import React from "react";
import { View, Text } from "react-native";
import TaskButton from "./TaskButton";
import PropTypes from 'prop-types';

const TaskList = ({ tasks, taskIndex, onTaskComplete, onTaskSkip }) => {
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
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  taskIndex: PropTypes.number.isRequired,
  onTaskComplete: PropTypes.func.isRequired,
  onTaskSkip: PropTypes.func.isRequired,
};

export default TaskList;