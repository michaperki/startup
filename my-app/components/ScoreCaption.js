import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ScoreCaptionPositive from "./ScoreCaptionPositive";
import ScoreCaptionNegative from "./ScoreCaptionNegative";
import ScoreCaptionNeutral from "./ScoreCaptionNeutral";

class ScoreCaption extends Component {
  render() {
    if (this.props.score > this.props.prevScore) {
      return <ScoreCaptionPositive />;
    } else if (this.props.score < this.props.prevScore) {
      return <ScoreCaptionNegative />;
    } else {
      return <ScoreCaptionNeutral />;
    }
  }
}

export default ScoreCaption;
