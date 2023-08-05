import React from "react";
import Swiper from "react-native-swiper";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Image,
} from "react-native";
import pawnImage from "../assets/pawn_transparent.png"; // Adjust the path according to your folder structure
import { completeTutorial } from "../services/firebaseService";
import { auth } from "../services/firebaseService";

const { width } = Dimensions.get("window");

const Tutorial = ({ navigation, route }) => {
  const { user } = route.params;

  const handleCompleteTutorial = (user) => {
    completeTutorial(user.uid)
      .then(() => {
        navigation.navigate("Lifelo");
      })
      .catch((error) => {
        console.error("Error completing tutorial: ", error);
      });
  };

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={false}
      paginationStyle={styles.paginationStyle}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
    >
      <View style={styles.slide}>
        <Text style={styles.titleText}>Welcome to Lifelo!</Text>
        <Text style={styles.descriptionText}>
          Lifelo is your digital space to keep track of your life.
        </Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.descriptionText}>
          Organize your daily routines and tasks effortlessly.
        </Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.descriptionText}>
          Monitor your progress and achieve your goals.
        </Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.descriptionText}>
          Collaborate with others and share your achievements.
        </Text>
      </View>
      <View style={styles.slide}>
        <Image source={pawnImage} style={styles.pawnImage} />
        <Text style={styles.text}>
          Here's the Overview tab, where you can get a quick snapshot of your
          tasks and progress.
        </Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.titleText}>Let's Dive In!</Text>
        <Button
          title="Get Started"
          onPress={() => handleCompleteTutorial(user)}
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    padding: 20,
  },
  titleText: {
    color: "#333",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  descriptionText: {
    color: "#555",
    fontSize: 22,
    textAlign: "center",
    lineHeight: 32, // For better readability
  },
  paginationStyle: {
    bottom: 15,
    right: 10,
  },
  dotStyle: {
    backgroundColor: "#888",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  activeDotStyle: {
    backgroundColor: "#333",
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 5,
    marginRight: 5,
  },
  pawnImage: {
    width: 100, // Or the size you prefer
    height: 100,
    marginBottom: 20, // Creates some space between the image and the text
  },
});

export default Tutorial;
