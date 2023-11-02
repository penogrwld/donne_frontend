import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
      } from "react-native";
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { signUp } from "../reducers/user";
  import { LinearGradient } from "expo-linear-gradient";
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import React from "react";
  import { localFetch } from "../localFetch";
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

  
  
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const PHONE_REGEX = /^(0[6-7]\d{8})$/
  
  export default function SuScreen({ navigation }) {

  
    const dispatch = useDispatch()
    // case cocher (pas cocher = false / cocher = true)
    const [isSelected, setSelection] = useState(false);
  
  
    const [signUpFirstName, setSignUpFirstname] = useState('');
    const [signUpLastName, setSignUpLastname] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPhone, setSignUpPhone] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [errorMail, setErrorMail] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorField, setErrorField] = useState(false);



    const handleSelect = () => {
      setSelection(!isSelected)
    }
  
    const handleRegister = () => {
          if(isSelected && EMAIL_REGEX.test(signUpEmail)){fetch(`${localFetch}/users/signup`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({firstname: signUpFirstName, avatar: null, lastname: signUpLastName, username: signUpUsername, phone: signUpPhone, email: signUpEmail, password: signUpPassword }),
          }).then(response => response.json())
              .then(data => {
                  if (data.result && PHONE_REGEX.test(signUpPhone)) {
                      dispatch(signUp({firstname: signUpFirstName, avatar: null, lastname: signUpLastName, username: signUpUsername, phone: signUpPhone, email: signUpEmail, token: data.token }));
            // vide les champs après inscription
                      setSignUpLastname('');
                      setSignUpFirstname('');
                      setSignUpUsername('');
                      setSignUpPhone('');
                      setSignUpEmail('');
                      setSignUpPassword('');
                      setSignUpPhone(null)
                      setErrorMail(false)
                      setErrorField(false)
                      navigation.navigate('TabNavigator',{ screen: 'Profil'})
                  } else if (!data.result) {
                    setErrorUsername(true)
                  } else {
                    setErrorField(true)
                  }
              });
      } else {
        setErrorMail(true)
      }
    };
  
    return (
      <KeyboardAwareScrollView style={styles.container}
      contentContainerStyle={styles.contentContainer}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <View style={styles.separator} />
          <View style={styles.header}>
             <FontAwesome name="angle-left" onPress={() => navigation.navigate('Si')} size={40} color="#000" />
          </View>
                       
        <View style={styles.top}>
        <Image style={styles.logo} source={require("../assets/Logo.png")}/>
        <Text style={styles.title}>DONNE</Text>
        </View>


          <View style={styles.containerInput}>
            { errorMail && <Text style={styles.errorMsg}>Le mail est invalide</Text>}
            { errorUsername && <Text style={styles.errorMsg}>Cette utilisateur existe déjà</Text>}
            { errorField && <Text style={styles.errorMsg}>Un champ n'a pas était rempli</Text>}
             <TextInput style={styles.input} placeholder="Prénom" onChangeText={(value) => setSignUpFirstname(value)} value={signUpFirstName}></TextInput>
             <TextInput style={styles.input} placeholder="Nom" onChangeText={(value) => setSignUpLastname(value)} value={signUpLastName}></TextInput>
             <TextInput style={styles.input} placeholder="Prénom" onChangeText={(value) => setSignUpFirstname(value)} value={signUpFirstName}></TextInput>
             <TextInput style={styles.input} placeholder="Pseudo" onChangeText={(value) => setSignUpUsername(value)} value={signUpUsername}></TextInput>
             <TextInput style={styles.input} placeholder="Mobile" onChangeText={(value) => setSignUpPhone(value)} value={signUpPhone}></TextInput>
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
              <Text style={styles.textValid}> J'accepte les </Text>
               {/* // Redirige vers la page CGU */}
              <Text style={styles.link} onPress={()=> navigation.navigate('Cgu')}>conditions générales d'utilisation</Text>
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
    errorMsg: {
      backgroundColor: '#A896CF',
      color: 'white',
      padding: 10,
      marginBottom: 10
    },
    separator: {
      height: 100, 
      backgroundColor: 'transparent',
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
      paddingBottom:600
    },

    containerInput: {
      width: "80%",
      height:"60%",
      paddingTop: 20,
      marginTop: 60
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
    },

    textValid: {
      color: 'black',
      marginTop: 15,
      fontSize: 13,
    },

    link: {
      textDecorationLine: "underline",
      textAlign:"left",
      fontWeight:"bold",
      fontSize: 13,
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
      marginTop:20,
      marginBottom:20
    },

    textAgreedBtn: {
    marginLeft:20,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    },

    top: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 20, 
    },

    title: {
      fontSize: 20,
      fontFamily: 'Avenir',
      paddingTop: 15, 
    },
    logo: {
      width: 140,
      height: 80,      
    },
    
  });
  