// utils/scoring.js

export function calculateScore(timesCompleted, timesSkipped) {
  // Your ELO-like calculation logic here.
  // This is just a placeholder.
  console.log(`calculateScore() called.`); // This will log the function call.
  console.log(`timesCompleted:`, timesCompleted); // This will log the timesCompleted.
  console.log(`timesSkipped:`, timesSkipped); // This will log the timesSkipped.
  let dataAmount = timesCompleted + timesSkipped;
  let balance = timesCompleted - timesSkipped;
  let score = Math.round((balance / dataAmount) * 100);
  // if score is NaN or Infinity, set it to 0
  if (isNaN(score) || !isFinite(score)) {
    score = 0;
  }
  console.log(`score:`, score); // This will log the score.
  return score;
}
