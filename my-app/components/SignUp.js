import React, { useState } from "react";
import { Text, View, TextInput, Button, themeheet } from "react-native";
import theme from "../theme";
import { signUp, createUserInDB, getTutorialStatus } from "../services/firebaseService";


const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    signUp(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        console.log("Signed-up user:", userCredential.user); // Debug the returned user
        return createUserInDB(uid).then(() => uid); // Return the uid after creating user in DB
      })
      .then((uid) => {
        console.log("Created user in DB with uid:", uid); 
        onSignUpSuccess({ uid: uid }); // Note the change here
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const onSignUpSuccess = (user) => {
    getTutorialStatus(user.uid)
      .then((tutorialData) => {
        if (tutorialData.hasCompletedTutorial) { // Adjusted this line
          props.navigation.navigate("Lifelo");
        } else {
          props.navigation.navigate("Tutorial", { user: user });
        }
      })
      .catch((error) => {
        console.error("Error checking tutorial status: ", error);
      });
  };

  const navigateToLogin = () => {
    props.navigation.navigate("Log In");
  };

  return (
    <View style={theme.container}>
      <Text style={theme.header}>Sign Up</Text>
      <Text style={theme.errorMessage}>{errorMessage}</Text>

      <InputLabel value={email} onChange={setEmail} label="Email" />
      <InputLabel
        value={password}
        onChange={setPassword}
        label="Password"
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Already have an account? Login"
        onPress={navigateToLogin}
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

export default SignUp;
