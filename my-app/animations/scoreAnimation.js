import { Animated } from 'react-native';

export const fadeInOutAnimation = (fadeAnim, callback = () => {}) => {
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
      }).start(callback);
    }, 1000);
  });
};

export const scoreTickAnimation = (difference, setDisplayedScore, callback = () => {}) => {
  const stepsRequired = Math.abs(difference);
  const step = Math.sign(difference);
  const intervalDuration = 2000 / stepsRequired;
  let stepsTaken = 0;

  const interval = setInterval(() => {
    stepsTaken++;
    setDisplayedScore((prev) => prev + step);

    if (stepsTaken === stepsRequired) {
      clearInterval(interval);
      callback();
    }
  }, intervalDuration);
};
