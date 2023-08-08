// TaskButton.js
import React, { useCallback } from "react";
import AwesomeButton from "react-native-really-awesome-button";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";

const TaskButton = ({ task, onComplete, onSkip }) => {
  const handleComplete = useCallback(() => {
    onComplete(task.id);
  }, [task, onComplete]);

  const handleSkip = useCallback(() => {
    onSkip(task.id);
  }, [task, onSkip]);

  return (
    <View>
      <AwesomeButton
        backgroundColor="#FFD700"
        textColor="#000000"
        width={200}
        onPress={handleComplete}
      >
        <Text>{task.description}</Text>
      </AwesomeButton>
      <Button title="Skip" onPress={handleSkip} color="#888" />
      {/* Skip button */}
    </View>
  );
};

TaskButton.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default TaskButton;
