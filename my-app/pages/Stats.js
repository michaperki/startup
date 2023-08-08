// template for the Stats page

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Stats = () => {
  return (
    <View style={styles.container}>
      <Text>Stats</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Stats;