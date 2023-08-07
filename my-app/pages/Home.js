// components/Home.js

import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>Lifelo</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.image}
              />
            </View>
          </View>
          <Text style={styles.subtitle}>
            A place to keep track of your life
          </Text>
        </View>

        <Button
          title="Log In"
          onPress={() => this.props.navigation.navigate("Log In")}
        />
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("Sign Up")}
        />
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around", // add this line to space your items evenly along the main axis
  },
  headerContainer: {
    flex: 1, // let's make this flex: 0.5 to reduce its size
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center", // add this line to center your title and logo in this container
    width: "100%", // add this line to make sure your headerContainer takes the full width
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center", // align items along the cross axis (vertically in this case)
    justifyContent: "center", // add this line to center your title and logo in this container
  },
  title: {
    fontSize: 50,
    marginHorizontal: 20, // add some horizontal margin to your title
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center", // center your subtitle text
    paddingHorizontal: 20, // add some padding to your subtitle
    paddingVertical: 10, // add some padding to your subtitle
  },
  imageContainer: {
    marginHorizontal: 20, // add some horizontal margin to your image
    border: "1px solid black", // add a border to your image container
    borderRadius: 15, // round your image container
    // cut off the image overflow
    overflow: "hidden",
  },

  image: {
    width: 100,
    height: 100,
  },
});

export default Home;
