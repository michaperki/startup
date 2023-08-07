// App.js
import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getTutorialStatus } from "./services/firebaseService";
import { getAuth } from "firebase/auth";
import { UserProvider } from "./contexts/UserContext";

// components
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Lifelo from "./components/Lifelo";
import Tutorial from "./components/Tutorial";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCompletedTutorial: false,
      isLoading: true, // Add an isLoading state to know when Firebase returns the value
    };
  }
  componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      getTutorialStatus(user.uid)
        .then((hasCompletedTutorial) => {
          this.setState({ hasCompletedTutorial, isLoading: false });
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          console.log(error);
        });
    } else {
      this.setState({ isLoading: false });
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Log In" component={LogIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Tutorial" component={Tutorial} />
            <Stack.Screen name="Lifelo" component={Lifelo} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    );
  }
}

// This is the navigator
// It is a placeholder for now.
const Stack = createNativeStackNavigator();
