import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

class Scratch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Scratch</Text>
        {/* link to the counter component */}
        
        <Button
          title="Score"
          onPress={() => this.props.navigation.navigate('Score')}
        />
        
        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
    },
});

export default Scratch;
