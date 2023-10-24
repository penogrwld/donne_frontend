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
  Modal,
  Pressable
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from 'react';
import user from "../reducers/user";
import object from "../reducers/object";
import { addGift, addLocation } from "../reducers/object";


export default function DonationScreen({ navigation }) {

  const dispatch = useDispatch()
  const [isSelectedOne, setSelectionOne] = useState(false);
  const [isSelectedTwo, setSelectionTwo] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState('')
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('')
  const [isLocation, setIsLocation] = useState(false)

  const user = useSelector((state)=> state.user.value)
  const object = useSelector((state)=> state.object.value)
 

  const handleSelectOne = () => {
    setSelectionOne(!isSelectedOne)
    setSelectionTwo(false)
    setCondition('Ready to use')
  }
  const handleSelectTwo = () => {
    setSelectionTwo(!isSelectedTwo)
    setSelectionOne(false)
    setCondition('À retaper')
  }

  const handleAddLocation = () => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}&postcode=${postalCode}`)
    .then((response) => response.json())
    .then(data => {
      const myCity = data.features[1]
      const location = {
        city: myCity.properties.city,
        postalCode: myCity.properties.postcode
      };
      dispatch(addLocation({city: location.city, postalCode: location.postalCode}))
    })
    setIsLocation(true)
  }


  // console.log(object.localisation)
  return (
    <View style={styles.container}>
      <Modal animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput placeholder='Ajoutez votre ville...'  placeholderTextColor='grey' onChangeText={(value) => setCity(value)} value={city} style={styles.input}/>
            <TextInput placeholder='Ajoutez votre code postal...'  placeholderTextColor='grey' onChangeText={(value) => setPostalCode(value)} value={postalCode} style={styles.input}/>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
              
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                handleAddLocation()
                setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>

      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.header}>
        <Text style={styles.headerText}>FAIRE UN DON</Text>
      </View>
        <Text style={styles.photoText}>AJOUTER DES PHOTOS :</Text>
      <View style={styles.photos} >
        {object.image.length === 0 ? (<TouchableOpacity style={styles.addPhoto} onPress={() => navigation.navigate("Snap")}>
          <Text>+</Text>
        </TouchableOpacity>) : (
        <Image style={styles.image} source={{ uri: object.image[0] }} />)}
        {object.image.length <= 1 ? (<TouchableOpacity style={styles.addPhoto} onPress={() => navigation.navigate("Snap")}>
          <Text>+</Text>
        </TouchableOpacity>) : (
        <Image style={styles.image} source={{ uri: object.image[1] }} />)}
        {object.image.length <= 2 ? (<TouchableOpacity style={styles.addPhoto} onPress={() => navigation.navigate("Snap")}>
          <Text>+</Text>
        </TouchableOpacity>) : (
        <Image style={styles.image} source={{ uri: object.image[2] }} />)}
        {object.image.length <= 3 ? (<TouchableOpacity style={styles.addPhoto} onPress={() => navigation.navigate("Snap")}>
          <Text>+</Text>
        </TouchableOpacity>) : (
          <Image style={styles.image} source={{ uri: object.image[3] }} />)}
        {object.image.length <= 4 ? (<TouchableOpacity style={styles.addPhoto} onPress={() => navigation.navigate("Snap")}>
          <Text>+</Text>
        </TouchableOpacity>) : (
          <Image style={styles.image} source={{ uri: object.image[4] }} />)}
        
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
        <View style={styles.checkOne}>
        {isSelectedOne ? ( 
            <FontAwesome name='check-square' size={20} color={'#74D48F'} onPress={()=> handleSelectOne()}/> 
          ) : (
            <FontAwesome name='square-o' size={20} color={'black'} onPress={()=> handleSelectOne()} />
            )}
            <Text>Ready to use</Text>
            </View>
            <View style={styles.checkTwo}>
            {isSelectedTwo ? ( 
            <FontAwesome name='check-square' size={20} color={'#74D48F'} onPress={()=> handleSelectTwo()}/> 
          ) : (
            <FontAwesome name='square-o' size={20} color={'black'} onPress={()=> handleSelectTwo()} />
            )}
            <Text>À retaper</Text>
        </View>
        <View>
          <Text style={styles.localisationTitle}>LOCALISATION :</Text>
          {!isLocation ? (
          <TouchableOpacity onPress={()=> setModalVisible(true)} style={styles.addLocalisation}>
            <Text style={styles.addLocalisationText}>Ajoutez votre adresse</Text>
          </TouchableOpacity>) : (
            <View style={styles.localisation}>
            <Text style={styles.localisationText}>{object.localisation.city}</Text>
            <Text style={styles.localisationText}>{object.localisation.postalCode}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.goBtn}>
      <TouchableOpacity>
        <Text style={styles.goText}>GO !</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: '25%',
    },
  photoText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 15,
    marginLeft: 30,
  },
  addPhoto: {
    backgroundColor: 'white',
    height: '35%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10
  },
  image: {
    margin: 15,
    width: 70,
    height: 70,
  },
  addTitle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 18,
    textDecorationLine: 'underline',
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
    marginTop: '-10%'
  },
  addState: {
    marginTop: '-45%',
    height: '15%',
  },
  titleState: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginLeft: 30,

  },
    checkOne: {
      marginTop: 20,
      marginLeft: 30,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '25%',
      marginBottom: -10
      
  },
  checkTwo: {
    marginTop: 20,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '20%'
  },
  localisationTitle: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 10,
    marginLeft: 30,
    
  },
  addLocalisation: {
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 10,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74D48F',
    padding: 6,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
  },
  addLocalisationText: {
    color: 'white',
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  input: {
    borderBottomColor: '#74D48F',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 5
  },
  buttonOpen: {
    backgroundColor: '#74D48F',
  },
  buttonClose: {
    backgroundColor: '#74D48F',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  goBtn: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
    marginLeft: '80%',
    borderRadius: 10,
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74D48F',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
  },
  goText: {
    color: 'white'
  },
  localisation: {
    marginTop: 10,
    marginLeft: 30,
  },
  localisationText: {
    fontSize: 16
  }
});

