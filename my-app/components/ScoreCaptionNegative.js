// Score.js component
// ScoreCaptionNegative.js component
// renders a + in green

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class ScoreCaptionNegative extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>-</Text>
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  caption: {
    fontSize: 50,
    color: "red",
  },
});

export default ScoreCaptionNegative;