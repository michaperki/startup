import React from "react";
import { Text, View, Button } from "react-native";
import PropTypes from 'prop-types';

const RoutineSelector = ({ taskLists, onSelect }) => {
  if (!taskLists) {
    return <Text>Loading...</Text>;
  }

  const routineNames = Object.keys(taskLists);
  return (
    <View>
      {routineNames.map((name) => (
        <Button
          key={name}
          title={`Start ${name}`}
          onPress={() => onSelect(name)}
        />
      ))}
    </View>
  );
};

RoutineSelector.propTypes = {
  taskLists: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default RoutineSelector;
