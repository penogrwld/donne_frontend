import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from "react";

export default function DonneurScreen({navigation}) {

  const [accepted, setAccepted] = useState(false)



  const handleAccept = () => {
    setAccepted(!accepted)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.header}>
        <FontAwesome name='arrow-left' size={20} color={'black'} onPress={() => navigation.navigate('Donner')}/>
        <Text style={styles.headerText} >Coté Donneur</Text>
        <FontAwesome name='exchange' size={20} color={'black'} onPress={() => navigation.navigate('Likes')}/>
      </View>
      {!accepted ? (<View style={styles.div}>
        <View>
          <Image style={styles.imgItem} source={{
            uri: 'https://www.ikea.com/fr/fr/images/products/ekedalen-table-extensible-bouleau__0736961_pe740825_s5.jpg'
          }}/>
          <Image style={styles.imgUser} onPress={() => navigation.navigate('Profile')} source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png'
          }}/>
        </View>
        <View style={styles.textes}>
          <Text style={styles.titleText}>Table blanc de qualité PREND !!</Text>
          <Text>Acceptez vous de donnez cet objet ?</Text>
          <View style={styles.buttonsOne}>
            <TouchableOpacity style={styles.buttonNo}><Text>NON</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonYes} onPress={() => handleAccept()}><Text>OUI</Text></TouchableOpacity>
          </View>
        </View>
      </View>) : 
      (<View style={styles.accepted}>
        <Text>La donnation a-t-elle été effectuée ?</Text>
        <View style={styles.buttonsTwo}>
            <TouchableOpacity style={styles.buttonNo} onPress={() => handleAccept()}><Text>NON</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonYes}><Text>OUI</Text></TouchableOpacity>
        </View>
      </View>) } 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },

  // Style pour l'en-tête
  header: {
    borderBottomWidth: 1,
    padding: 25,
    justifyContent: "space-around",
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800'
  },

  // Style pour chaque composant
  div: {
    // justifyContent: "space-around",
    // alignItems: "center",
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#BBBBBB'
  },
  imgItem: {
    width: 70,
    height: 70,
    borderRadius: 10,
    // alignItems: "flex-start"
  },
  imgUser: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 10,
    justifyContent: "center"
  },
  textes: {
    marginLeft: 10

  },
  titleText: {
    fontWeight: '700',
    marginBottom: 10
  },

  // Style des boutons
  buttonsOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderWidth: 1,
    marginTop: 30,
  },
  buttonsTwo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
    // borderWidth: 1,
    marginTop: 30,
  },
  buttonNo: {
    backgroundColor: "#A896CF",
    // padding: 20,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    // marginTop: 10,
    width: 70,
    height: 50
  },
  buttonYes: {
    backgroundColor: "#74D48F",
    // padding: 20,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    // marginTop: 10,
    width: 70,
    height: 50
  },
  accepted: {
    marginTop: 10,
    // justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#BBBBBB'
    // borderWidth:1
    // borderWidth: 1,
    // flexDirection: 'column',
  }
});



      