import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Image,
  } from "react-native";
  import { SocialIcon } from "react-native-elements";
  import { LinearGradient } from "expo-linear-gradient";
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { signIn } from "../reducers/user";
  import React from "react";
  import { localFetch } from "../localFetch";
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  
  
  export default function SiScreen({ navigation }) {
  
  
    const dispatch = useDispatch()
    const [signInUsername, setSignInUsername] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [errorField, setErrorField] = useState(false)
  
  
    const handleConnexion = () => {
          fetch(`https://${localFetch}/users/signin`, {
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
      <KeyboardAwareScrollView style={styles.container}
      contentContainerStyle={styles.contentContainer}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <View style={styles.separator} />

        <View style={styles.top}>
        <Image style={styles.logo} source={require("../assets/Logo.png")}/>
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
              Pas encore inscrit ? <Text
                onPress={() => navigation.navigate("Su")}
                style={styles.link}
              >Inscription
              </Text>
            </Text>
            {/* <Text style={styles.connectWith}>Se connecter avec: </Text> */}
            {/* // Permet de s'incrire ou se connecter avec un réseau social */}
            {/* <SocialIcon
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
            /> */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    contentContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    separator: {
      height: 170, 
      backgroundColor: 'transparent',
    },
    
    background: {
      height: "100%",
      width: "100%",
      position: "absolute",
    },
    containerInput: {
      width: "80%",
      marginTop: 30,
      marginBottom: 20,
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
      marginTop: 30,
      marginRight: 10
    },
    text: {
      color: "white",
    },
    connectWith: {
      margin: 15,
    },
    question: {
      alignItems: "center",
      marginTop: 10,
      padding: 40,
      margin: 10,
    },
    link: {
      textDecorationLine: "underline",
      fontSize: 15,
    },
    social: {
      padding: 30,
    },
    top: {
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 30,
      fontFamily: 'Avenir',
      paddingTop: 15, 
    },
    logo: {
      width: 250,
      height: 150,
    },
  });
  