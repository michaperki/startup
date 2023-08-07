import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

const Score = ({ score }) => {
  const [displayedScore, setDisplayedScore] = useState(0);
  const [scoreDifference, setScoreDifference] = useState(0);
  const fadeAnim = new Animated.Value(1);
  const animationDuration = 2000; // 2 seconds
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

      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });

      const stepsRequired = Math.abs(difference);
      const step = Math.sign(difference);
      const intervalDuration = animationDuration / stepsRequired;
      let stepsTaken = 0;

      const interval = setInterval(() => {
        stepsTaken++;
        setDisplayedScore((prev) => prev + step);

        if (stepsTaken === stepsRequired) {
          clearInterval(interval);
        }
      }, intervalDuration);

      return () => clearInterval(interval); // Cleanup on component unmount or prop change
    }
  }, [score]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Score</Text>
      <Text style={styles.score}>{displayedScore}</Text>
      <Animated.Text style={[styles.difference, { opacity: fadeAnim }]}>
        {scoreDifference > 0 ? `+${scoreDifference}` : scoreDifference}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  score: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  difference: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

export default Score;
