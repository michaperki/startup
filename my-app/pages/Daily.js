import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Score from "../components/Score";
import DailyOutcome from "../components/DailyOutcome";
import RoutineSelector from "../components/RoutineSelector";

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
