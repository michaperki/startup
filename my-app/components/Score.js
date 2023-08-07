// Score.js
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Score extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.score}>{this.props.score}</Text>
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default Score;
