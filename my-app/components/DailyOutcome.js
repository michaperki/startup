// DailyOutcome.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DailyOutcome = ({ score, caption, backgroundColor }) => (
  <View style={[styles.container, { backgroundColor }]}>
    <Text style={styles.score}>{score}</Text>
    <Text style={styles.caption}>{caption}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,              // Added margin
    padding: 10,             // Increased padding
    borderRadius: 10,        // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,            // Adds shadow on Android
    shadowColor: "#000",     // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  score: {
    fontSize: 38,           // Slightly increased font size
    fontWeight: "bold",     // Made the font bolder
    textAlign: "center",
    marginBottom: 5,        // Gap between score and caption
  },
  caption: {
    fontSize: 14,           // Slightly decreased font size
    letterSpacing: 0.5,     // Added letter spacing
    textAlign: "center",
    color: "#555",          // Slightly subdued color for caption
  },
});

export default DailyOutcome;
