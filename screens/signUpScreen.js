import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default function SignUpScreen({ navigation }) {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholder="Nom"></TextInput>
        <TextInput style={styles.input} placeholder="Prénom"></TextInput>
        <TextInput style={styles.input} placeholder="Pseudo"></TextInput>
        <TextInput style={styles.input} placeholder="Email"></TextInput>
        <TextInput style={styles.input} placeholder="Mot de passe"></TextInput>
        <View style={styles.check}>
          <CheckBox
            style={styles.checkbox}
            value={isSelected}
            onValueChange={setSelection}
          />
          <Text>J'accepte les </Text>
          // Redirige vers la page CGU
          <Text style={styles.link}>conditions générales d'utilisations</Text>
        </View>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate("Choices")}
        >
          // Au clique ramène sur la page Choices
          <Text style={styles.text}>INSCRIPTION</Text>
        </TouchableOpacity>
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
  check: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    flexWrap: "wrap",
    // textAlign: 'left',
    // right: 10,
    // left: -20,
    // bottom: 50
  },
  checkbox: {
    marginRight: 20,
  },
  link: {
    textDecorationLine: "underline",
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
});
