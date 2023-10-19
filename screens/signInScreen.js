import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { SocialIcon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

import React from "react";

export default function signInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholder="UserName"></TextInput>
        <TextInput style={styles.input} placeholder="Password"></TextInput>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate("Choices")}
        >
          <Text style={styles.text}>CONNEXION</Text>
        </TouchableOpacity>
        <View style={styles.question}>
          <Text>
            Pas encore inscrit ?{" "}
            <Text
              onPress={() => navigation.navigate("signUp")}
              style={styles.link}
            >
              Inscription
            </Text>
          </Text>
          <Text style={styles.connectWith}>Se connecter avec: </Text>
          <SocialIcon style={styles.social} title="Sign In With Facebook" button type="facebook" />
          <SocialIcon style={styles.social} title="Sign In With Google" button type="google" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  containerInput: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00000015",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  buttons: {
    backgroundColor: "#74D48F",
    padding: 20,
    // margin: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    marginTop: 10,
  },
  text: {
    color: "white",
    fontFamily: "Montserrat",
  },
  connectWith:{
    margin: 15
  },
  question: {
    alignItems: "center",
    marginTop: 10,
  },
  link: {
    textDecorationLine: "underline",
  },
  social: {
    padding: 30
  }
});
