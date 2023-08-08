import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Score from "../components/Score";
import DailyOutcome from "../components/DailyOutcome";
import RoutineSelector from "../components/RoutineSelector";
import PropTypes from "prop-types";

const computeHighAndLowScore = (tasks, score) => {
  if (!tasks || tasks.length === 0) {
    return { highScore: 0, lowScore: 0 };
  }

  const highScoreDiff = tasks.reduce(
    (acc, task) => acc + task.points.complete,
    0
  );
  const lowScoreDiff = tasks.reduce((acc, task) => acc + task.points.skip, 0);

  const highScore = score + highScoreDiff;
  const lowScore = score + lowScoreDiff;

  return { highScore, lowScore };
};

const Daily = ({ score, tasks, taskLists, onSelect, routine }) => {
  const { highScore, lowScore } = computeHighAndLowScore(tasks, score);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily View</Text>
      <Score score={score} />
      <View style={styles.bestAndWorst}>
        <DailyOutcome
          score={lowScore}
          caption="worst"
          backgroundColor="#ffe6e6"
        />
        <DailyOutcome
          score={highScore}
          caption="best"
          backgroundColor="#e6ffe6"
        />
      </View>
      <RoutineSelector taskLists={taskLists} onSelect={onSelect} />
      <Text style={styles.routineHeader}>Current Routine:</Text>
      <View style={styles.routineContainer}>
        {tasks.map((task, index) => (
          <Text key={index} style={styles.task}>
            Task {index + 1}: {task.description}
          </Text>
        ))}
      </View>
    </View>
  );
};

Daily.propTypes = {
  score: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      points: PropTypes.shape({
        complete: PropTypes.number.isRequired,
        skip: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  taskLists: PropTypes.array.isRequired, // Assuming this is an array but details about shape are not given
  onSelect: PropTypes.func.isRequired,
  routine: PropTypes.any, // Using 'any' here because we don't have details about the shape of routine
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
  },
  routineHeader: {
    fontSize: 18,
    textAlign: "center",
  },
  bestAndWorst: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  routineContainer: {
    padding: 20,
  },
});

export default Daily;
