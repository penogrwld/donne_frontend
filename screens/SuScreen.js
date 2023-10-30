import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
      } from "react-native";
  //import { CheckBox } from "react-native-elements";
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { signUp } from "../reducers/user";
  import { LinearGradient } from "expo-linear-gradient";
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import React from "react";
  import { localFetch } from "../localFetch";
  
  
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  export default function SuScreen({ navigation }) {

  
    const dispatch = useDispatch()
    // case cocher (pas cocher = false / cocher = true)
    const [isSelected, setSelection] = useState(false);
  
  
    const [signUpFirstName, setSignUpFirstname] = useState('');
    const [signUpLastName, setSignUpLastname] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
      const [signUpPassword, setSignUpPassword] = useState('');
  
    const handleSelect = () => {
      setSelection(!isSelected)
    }
  
    const handleRegister = () => {
          if(isSelected){fetch(`http://${localFetch}:3000/users/signup`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({firstname: signUpFirstName, avatar: null, lastname: signUpLastName, username: signUpUsername, email: signUpEmail, password: signUpPassword }),
          }).then(response => response.json())
              .then(data => {
                  if (data.result && EMAIL_REGEX.test(signUpEmail)) {
                      dispatch(signUp({firstname: signUpFirstName, avatar: null, lastname: signUpLastName, username: signUpUsername, email: signUpEmail, token: data.token }));
            // vide les champs après inscription
                      setSignUpLastname('');
                      setSignUpFirstname('');
                      setSignUpUsername('');
                      setSignUpEmail('');
                      setSignUpPassword('');
                      navigation.navigate('TabNavigator',{ screen: 'Profil'})
                  }
              });
      }};
  
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
          <View style={styles.header}>
             <FontAwesome name="arrow-left" onPress={() => navigation.navigate('Si')} size={32} color="#000" />
          </View>
                       
          <View style={styles.containerInput}>
             <TextInput style={styles.input} placeholder="Nom" onChangeText={(value) => setSignUpLastname(value)} value={signUpLastName}></TextInput>
             <TextInput style={styles.input} placeholder="Prénom" onChangeText={(value) => setSignUpFirstname(value)} value={signUpFirstName}></TextInput>
             <TextInput style={styles.input} placeholder="Pseudo" onChangeText={(value) => setSignUpUsername(value)} value={signUpUsername}></TextInput>
             <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail}></TextInput>
             <TextInput style={styles.input} secureTextEntry={true} placeholder="Mot de passe" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword}></TextInput>
             <View name="AgreedContainer" style={styles.agreedContainer}>
             <View name= "CheckBtn"style={styles.check}>
          { isSelected ? (<FontAwesome
              style={styles.checkbox}
              name="check-square"
              value={isSelected}
              color={'#74D48F'}
              onPress={() => handleSelect()}
              size={30}
              margin={-12}
            />) : (<FontAwesome
              style={styles.checkbox}
              name="square-o"
              value={isSelected}
              color={'black'}
              onPress={() => handleSelect()}
              size={30}
              margin={-12}
              
            />) } 
            <View name="TextAgreedBtn"style={styles.textAgreedBtn}>
              <Text style={styles.textValid}>  J'accepte les </Text>
               {/* // Redirige vers la page CGU */}
              <Text style={styles.link} onPress={()=> navigation.navigate('Cgu')}>conditions générales d'utilisations (CGU)</Text>
            </View>
          </View>
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
    header: {
      width: "100%",
      alignItems:"flex-start",
      flexDirection:"row",
      margin: 0,
      padding: 20,
      position:'absolute',
      paddingBottom:720
    },

    

    containerInput: {
      width: "80%",
      height:"60%",
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
      marginTop: -10
      // marginLeft: -20
      // justifyContent: "center",
      // position: 'absolute',
      // flexWrap: "wrap",
      // textAlign: 'left',
      // right: 10,
      // left: -20,
      // bottom: 50
    },

    // checkbox: {
    //   marginRight: 20,
    // },
    textValid: {
      marginLeft: -7,
      color: 'black',
      marginTop:15
    },

    link: {
      textDecorationLine: "underline",
      textAlign:"left",
      fontWeight:"bold",
    },

    buttons: {
      backgroundColor: "#74D48F",
      padding: 20,
      alignItems: "center",
      borderRadius: 10,
      shadowOffset: { width: 5, height: 5 },
      shadowColor: "grey",
      shadowOpacity: 1.0,
      marginTop: 10,
    },

    text: {
      color: "white",
    },

    agreedContainer: {
      flexDirection:"row",
      marginTop:20,
      marginBottom:20
    },

    textAgreedBtn: {
    marginLeft:20,
    
    }
    
  });
  