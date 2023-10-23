import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";



export default function DonationScreen() {
  const dispatch = useDispatch()
  const [isSelectedOne, setSelectionOne] = useState(false);
  const [isSelectedTwo, setSelectionTwo] = useState(false)

  handleSelectOne = () => {
    setSelectionOne(!isSelectedOne)
  }
  handleSelectTwo = () => {
    setSelectionTwo(!isSelectedTwo)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.header}>
        <Text style={styles.headerText}>FAIRE UN DON</Text>
      </View>
        <Text style={styles.photoText}>AJOUTER DES PHOTOS :</Text>
      <View style={styles.photos} >
        <TouchableOpacity style={styles.addPhoto}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addPhoto}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addPhoto}>
          <Text>+</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.photos} >
        <TouchableOpacity style={styles.addPhoto}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addPhoto}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.titleText}>TITRE :</Text>
        <View style={styles.addTitle}>
          <TextInput style={styles.inputTitle} placeholder="Ajouter un titre"></TextInput>
        </View>
        <View>
      </View>
          <Text style={styles.descriptionText}>DESCRIPTION :</Text>
          <View style={styles.addDescription}>
            <TextInput style={styles.inputDescription} placeholder="Ajouter une description"></TextInput>
          </View>
        </View>
      <View style={styles.addState}>
        <Text style={styles.titleState}>ETAT :</Text>
        <View style={styles.check}>
        {isSelectedOne ? ( 
            <FontAwesome name='check-square' size={20} color={'green'} onPress={()=> handleSelectOne()}/> 
          ) : (
            <FontAwesome name='square-o' size={20} color={'black'} onPress={()=> handleSelectOne()} />
            )}
            {isSelectedTwo ? ( 
            <FontAwesome name='check-square' size={20} color={'green'} onPress={()=> handleSelectTwo()}/> 
          ) : (
            <FontAwesome name='square-o' size={20} color={'black'} onPress={()=> handleSelectTwo()} />
            )}
        </View>
      </View>
    </SafeAreaView>
  )
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
  header: {
    borderBottomWidth: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800'
  },
  photos: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: '-25%',
    justifyContent: 'center',
    },
  photoText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 20,
    marginLeft: 30,
  },
  addPhoto: {
    backgroundColor: 'white',
    height: '35%',
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10
  },
  addTitle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 10,
    marginLeft: 30,
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    width: '80%',
  },
  descriptionText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 10,
    marginLeft: 30,
  },
  inputDescription: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    width: '80%',
    height: '40%'
  },
  addDescription: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-5%'
  },
  addState: {
    marginTop: '-40%',
    height: '15%',
  },
  titleState: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginLeft: 30,

  },
    check: {
      marginTop: 20,
      marginLeft: 30,

  },


});

