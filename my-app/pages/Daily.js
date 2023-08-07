import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Score from "../components/Score";
import TaskList from "../components/TaskList";
import RoutineSelector from "../components/RoutineSelector";
import DailyOutcome from "../components/DailyOutcome";

class Daily extends Component {
  // function to compute the high score and low score
  // from the tasks array and the score
  computeHighAndLowScore(tasks, score) {
    // if there are no tasks, return 0 for both
    if (!tasks || tasks.length === 0) {
      return { highScore: 0, lowScore: 0 };
    }

    // otherwise, compute the high and low scores
    // from the tasks array and the score
    const highScoreDiff = tasks.reduce((acc, task) => {
      return acc + task.points.complete;
    }, 0);

    const lowScoreDiff = tasks.reduce((acc, task) => {
      return acc + task.points.skip;
    }, 0);

    const highScore = score + highScoreDiff;
    const lowScore = score + lowScoreDiff;

    return { highScore, lowScore };
  }

  render() {
    const { score, tasks, taskLists, onSelect, routine } = this.props;

    // compute the high and low scores
    const { highScore, lowScore } = this.computeHighAndLowScore(tasks, score);

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
        <Text style={styles.routineHeader}>Current Routine: {routine}</Text>
      </View>
    );
  }
}

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
});

export default Daily;
