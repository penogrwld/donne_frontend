import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../reducers/user";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default function SignUpScreen({ navigation }) {

  const dispatch = useDispatch()
  const [isSelected, setSelection] = useState(false);
  const [signUpFirstName, setSignUpFirstname] = useState('');
  const [signUpLastName, setSignUpLastname] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');

  const handleRegister = () => {
		fetch('http://10.3.0.21:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({firstname: signUpFirstName, lastname: signUpLastName, username: signUpUsername, email: signUpEmail, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(signUp({firstname: signUpFirstName, lastname: signUpLastName, username: signUpUsername, email: signUpEmail, token: data.token }));
					setSignUpLastname('');
					setSignUpFirstname('');
					setSignUpUsername('');
					setSignUpEmail('');
					setSignUpPassword('');
          navigation.navigate("Choices")
				}
			});
	};

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholder="Nom" onChangeText={(value) => setSignUpLastname(value)} value={signUpLastName}></TextInput>
        <TextInput style={styles.input} placeholder="Prénom" onChangeText={(value) => setSignUpFirstname(value)} value={signUpFirstName}></TextInput>
        <TextInput style={styles.input} placeholder="Pseudo" onChangeText={(value) => setSignUpUsername(value)} value={signUpUsername}></TextInput>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail}></TextInput>
        <TextInput style={styles.input} secureTextEntry={true} placeholder="Mot de passe" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword}></TextInput>
        <View style={styles.check}>
          <CheckBox
            style={styles.checkbox}
            value={isSelected}
            onValueChange={setSelection}
          />
          <Text>J'accepte les </Text>
          {/* // Redirige vers la page CGU */}
          <Text style={styles.link}>conditions générales d'utilisations</Text>
        </View>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => handleRegister()}
        >
          {/* // Au clique ramène sur la page Choices */}
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
