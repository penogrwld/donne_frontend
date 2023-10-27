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
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { signIn } from "../reducers/user";
  import React from "react";
  import { localFetch } from "../localFetch";
  
  
  export default function SiScreen({ navigation }) {
  
    const dispatch = useDispatch()
    const [signInUsername, setSignInUsername] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [errorField, setErrorField] = useState(false)
  
  
    const handleConnexion = () => {
          fetch(`http://${localFetch}:3000/users/signin`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: signInUsername, password: signInPassword }),
          }).then(response => response.json())
              .then(data => {
                  if (data.result) {
                      dispatch(signIn(
                        { username: signInUsername, 
                          avatar: data.avatar,
                          token: data.token, 
                          lastname: data.lastname, 
                          firstname: data.firstname,
                          email: data.email  }));
            navigation.navigate("Choices")
                      setSignInUsername('');
                      setSignInPassword('');
            setErrorField(false)
                  } else {
            setErrorField(true)
          }
              });
      };
  
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />

        <View>
        <Text style={styles.title}>DONNE</Text>
        </View>

        <View style={styles.containerInput}>
          { errorField && <Text style={styles.errorMsg}>Le nom d'utilisateur ou le mot de passe est invalide</Text>}
          <TextInput style={styles.input} placeholder="Pseudo" onChangeText={(value) => setSignInUsername(value)} value={signInUsername}></TextInput>
          <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={(value) => setSignInPassword(value)} value={signInPassword}></TextInput>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => handleConnexion()}
          >
            {/* // Ramène sur la page Choices */}
            <Text style={styles.text}>CONNEXION</Text>
          </TouchableOpacity>
          <View style={styles.question}>
            <Text>
              {/* // Au clique ramène vers la page SignUp */}
              Pas encore inscrit ? 
              <Text
                onPress={() => navigation.navigate("Su")}
                style={styles.link}
              >
Inscription
              </Text>
            </Text>
            <Text style={styles.connectWith}>Se connecter avec: </Text>
            {/* // Permet de s'incrire ou se connecter avec un réseau social */}
            <SocialIcon
              style={styles.social}
              title="Sign In With Facebook"
              button
              type="facebook"
            />
            <SocialIcon
              style={styles.social}
              title="Sign In With Google"
              button
              type="google"
            />
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
    errorMsg: {
      backgroundColor: '#A896CF',
      color: 'white',
      padding: 10,
      marginBottom: 10
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
    connectWith: {
      margin: 15,
    },
    question: {
      alignItems: "center",
      marginTop: 10,
    },
    link: {
      textDecorationLine: "underline",
    },
    social: {
      padding: 30,
    },
    title: {
      padding: 30,
      fontSize: 30,
      fontFamily: 'Avenir',
    }
  });
  