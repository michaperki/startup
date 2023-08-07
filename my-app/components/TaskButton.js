import React, { useCallback } from "react";
import AwesomeButton from "react-native-really-awesome-button";

const TaskButton = ({ task, onComplete }) => {
  const handleComplete = useCallback(() => {
    onComplete(task.id);
  }, [task, onComplete]);

  return (
    <AwesomeButton
      backgroundColor="#FFD700"
      textColor="#000000"
      width={200}
      onPress={handleComplete}
    >
      {task.description}
    </AwesomeButton>
  );
};

export default TaskButton;
