import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

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

      // Fade-In
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Wait for a bit, then start the fade-out
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setScoreDifference(null));
        }, 1000);
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

          // Start fading out the difference once the score finishes ticking
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            // Reset scoreDifference once the fade out is complete
            setScoreDifference(null);
          });
        }
      }, intervalDuration);
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
