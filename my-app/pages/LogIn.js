import React, { useState } from "react";
import { logIn, getTutorialStatus } from "../services/firebaseService"; // ensure you've imported getTutorialStatus
import { Text, View, TextInput, Button } from "react-native";
import theme from "../theme";
import { useUser } from "../contexts/UserContext";

const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUser();

  const handleLogIn = () => {
    logIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged-in user:", user); // Debug the returned user
        onLoginSuccess(user);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const navigateToSignUp = () => {
    props.navigation.navigate("Sign Up");
  };

  const onLoginSuccess = (user) => {
    setUser(user); // Set the user in the UserContext
    getTutorialStatus(user.uid)
      .then((hasCompletedTutorial) => {
        if (hasCompletedTutorial) {
          props.navigation.navigate("Lifelo");
        } else {
          props.navigation.navigate("Tutorial", { user: user });
        }
      })
      .catch((error) => {
        console.error("Error checking tutorial status: ", error);
      });
  };

  return (
    <View style={theme.container}>
      <Text style={theme.header}>Log In</Text>
      <Text style={theme.errorMessage}>{errorMessage}</Text>

      <InputLabel value={email} onChange={setEmail} label="Email" />
      <InputLabel
        value={password}
        onChange={setPassword}
        label="Password"
        secureTextEntry
      />

      <Button title="Log In" onPress={handleLogIn} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={navigateToSignUp}
      />
    </View>
  );
};

const InputLabel = ({ value, onChange, label, ...props }) => (
  <>
    <Text style={theme.label}>{label}</Text>
    <TextInput
      style={theme.textInput}
      autoCapitalize="none"
      onChangeText={onChange}
      value={value}
      {...props}
    />
  </>
);

export default LogIn;
