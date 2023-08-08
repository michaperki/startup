import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import {
  fadeInOutAnimation,
  scoreTickAnimation,
} from "../animations/scoreAnimation";
import PropTypes from "prop-types";

const Score = ({ score }) => {
  const [displayedScore, setDisplayedScore] = useState(0);
  const [scoreDifference, setScoreDifference] = useState(null);
  const fadeAnim = new Animated.Value(1);
  const animationDuration = 2000;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setDisplayedScore(score);
      isFirstRender.current = false;
      return;
    }

    const difference = score - displayedScore;

    if (difference !== 0) {
      setScoreDifference(difference);

      scoreTickAnimation(difference, setDisplayedScore, () => {
        fadeInOutAnimation(fadeAnim, () => setScoreDifference(null));
      });
    }
  }, [score]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Score</Text>
      <Text style={styles.score}>{displayedScore}</Text>

      {scoreDifference !== null && (
        <Animated.Text
          style={[
            styles.difference,
            { opacity: fadeAnim, position: "absolute", top: 50 },
          ]}
        >
          {scoreDifference > 0 ? `+${scoreDifference}` : scoreDifference}
        </Animated.Text>
      )}
    </View>
  );
};

Score.propTypes = {
  score: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
  },
  difference: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    backgroundColor: "white",
  },
});

export default Score;
