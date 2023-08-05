import React, { Component } from "react";
import { Text, View, Button } from "react-native";

class RoutineSelector extends Component {
  render() {
    const { taskLists, onSelect } = this.props;

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
  }
}

export default RoutineSelector;
