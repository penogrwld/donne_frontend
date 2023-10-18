import { View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

export default function signInScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
      <TextInput style={styles.input} placeholder='UserName'></TextInput>
      <TextInput style={styles.input} placeholder='Password'></TextInput>
      <TouchableOpacity style={styles.buttons}>
        <Text style={styles.text}>CONNEXION</Text>
      </TouchableOpacity>
      <View style={styles.question}>
      <Text>Pas encore inscrit ? <Text style={styles.link}>Inscription</Text></Text>
      <Text>Se connecter avec: </Text>
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInput: {
    width: '80%',
  },
  input:{
    borderWidth: 1,
    borderColor: '#00000015',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10
  },
  buttons: {
    backgroundColor: '#74D48F',
    padding: 20,
    // margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset:{ width: 5,  height: 5, },
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    marginTop: 10
  },
  text:{
    color: 'white',
    fontFamily: 'Montserrat',
  },
  question: {
    alignItems:'center',
    marginTop: 10
  },
  link: {
    textDecorationLine: 'underline',
  }
})