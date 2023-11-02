import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeProfilePic } from "../reducers/user";
import { localFetch } from "../localFetch";
import { logout } from "../reducers/user";
import { useEffect, useState } from "react";
import Dons from "../components/Dons";
import Catchs from "../components/Catchs";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';

export default function UserScreen({navigation}) {

  const user = useSelector((state) => state.user.value)
  const image = useSelector((state)=> state.image.value)
  const dispatch = useDispatch()
  let focus = useIsFocused()


  const [modalVisible, setModalVisible] = useState(false)
  const [selectedObject, setSelectedObject] = useState(null);


  const [don, setDon] = useState([])
  const [catchs, setCatchs] = useState([])


  const [currentPosition, setCurrentPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
        
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
            setIsLoading(false)
          });
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoading && currentPosition) {
      dispatch(addLatitude(currentPosition.latitude));
      dispatch(addLongitude(currentPosition.longitude));
    }
  }, [isLoading, currentPosition]);

  useEffect(() => {
    fetch(`${localFetch}/users/${user.token}/object`)
    .then((response) => response.json())
    .then(data => {
      setDon(data)
    });

    fetch(`${localFetch}/users/${user.token}`)
    .then((response) => response.json()) 
    .then(data => {
      setCatchs(data.finalObj.catchs)
    })

  }, [focus]);


const allCatchs = catchs.map((obj, j) => {
  return <Catchs key= {j} catchs= {obj} />
});

let allObject = <></>
if(don.length>0){
  allObject = don.map((item, i) => (
   <View style={styles.photocontainer} key={i} >
     <TouchableOpacity onPress={() => handleObjectClick(item)}>
       <FontAwesome name='times-circle-o' size={20} color='#000000' style={styles.deleteIcon} />
     </TouchableOpacity>
       <Dons image={item.image} />
   </View>
 ));
}


const handleObjectClick = (object) => {
  setSelectedObject(object);
  setModalVisible(true);
   };

const handleRemoveObject = () => {
    if (selectedObject) {
      const objectId = selectedObject.id;
      handleRemoveObjectById(objectId);
    }
  };   


const handleRemoveObjectById = (objectId) => {
    if (objectId) {

      fetch(`${localFetch}/objects/${objectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.ok) {

        fetch(`${localFetch}/users/${user.token}/object`)
        .then((response) => response.json())
        .then(data => {
          setDon(data);
        });
        }
        else {
          console.error('Erreur de suppression de lobjet')
        }  
      })
      .catch((error) => {
        console.error('Erreur de requête fetch :', error);
      });  

      setModalVisible(false);
      setSelectedObject(null);
    }
  };   


  const handleRemove = () => {
    fetch(`${localFetch}/users/remove/${user.token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(dispatch(removeProfilePic()))
  }

  const handleDelete = () => {
    fetch(`${localFetch}/users/delete/${user.token}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(dispatch(logout()))
 navigation.navigate('Si')
    
  }
  

  return (
    <View style={styles.container}>

       {/* ajout de modal supprimer un objet de ses dons */}

       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Confirmez la suppression de l'objet :</Text>

            <View style={styles.ouiounon}>
                  <TouchableOpacity style={styles.yes} onPress={handleRemoveObject}>
                    <Text style={styles.textButton}>OUI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.not} onPress={() => setModalVisible(false)}>
                    <Text style={styles.textButton}>Annuler</Text>
                  </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.header}>
        <Text style={styles.headerText}>MON COMPTE</Text>
      </View>

    <ScrollView showsVerticalScrollIndicator={false}>


       <View style={styles.user}>
         <View style={styles.photos}>
         {!user.avatar ? (<TouchableOpacity style={styles.addPhoto} onPress={() => navigation.navigate("UserSnap")}>
          <Text>+</Text>
        </TouchableOpacity>) : (
          <View style={styles.deleteContainer}>
                <Image style={styles.image} source={{ uri: user.avatar }} />
                <TouchableOpacity onPress={() => handleRemove()}>
                <FontAwesome name='times-circle-o' size={20} color='black' style={styles.deleteicon} />
                </TouchableOpacity>
                </View>)}
         </View>

         <View style={styles.infos}>
         <Text>{user.firstname} {user.lastname}</Text>
         <Text>{user.email}</Text>
         <Text>@{user.username}</Text>

         <TouchableOpacity style={styles.logout} onPress={()=> {
           dispatch(logout())
           navigation.navigate('Si')
          }}>
          <FontAwesome name='power-off' size={20} color='white' style={styles.deleteicon} />
          <Text style={styles.textlogout}> DÉCONNEXION</Text>
         </TouchableOpacity>

         </View>
         
       </View>


       <View style={styles.top}>

        <Text style={styles.text1}>MES DONS</Text>



        <ScrollView style={styles.objects}
        contentContainerStyle={styles.objectsContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
         {allObject}
        </ScrollView>



          <TouchableOpacity style={styles.dons} onPress={()=>navigation.navigate('Donner')}>
         <View>
          <Text style={styles.textButton}>DONNER</Text>
         </View>
          </TouchableOpacity>

          </View>


       <View style={styles.text2}>
       <Text>MES CATCHS</Text>
    
       <ScrollView style={styles.objects}
        contentContainerStyle={styles.objectsContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        >
       {allCatchs}
       </ScrollView>
       </View>
        <View style={styles.cache}>
       <TouchableOpacity style={styles.delete} onPress={handleDelete}>
          <FontAwesome name='ban' size={20} color='white' style={styles.deleteicon2} />
          <Text style={styles.textDelete}> SUPPRIMER MON COMPTE</Text>
         </TouchableOpacity>
         </View>
       </ScrollView>

     </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'white'
  },

  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  
  header: {
    borderBottomWidth: 1,
    padding: 10,
    alignItems: "center",

  },

   headerText: {
    fontSize: 20,
    fontWeight: '800',
    paddingRight:5,
    paddingTop: 20,
  },
  user: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginRight: '5%',
  }, 
  infos:  {
    marginTop: '15%',
  },

  photos: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
    height: 110,
    width: 110,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
  },
  addPhoto: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    height: 110,
    width: 110,
    
  },
  
  top: {
    marginBottom: 40,
    marginTop: 60,
    borderTopWidth: 1,
    padding: 10,
  },
  
  text1: {
    padding: 10,
  },
  
  objects: {
    paddingTop: 20,
    paddingBottom: 30,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "grey",
    shadowOpacity: 1.0,

  },
  objectsContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  
  text2: {
    marginBottom: 200,
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 20,
  },
  
  image: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 70,
    marginTop: 50,
  
  },
  
  dons: {
    borderRadius: 50,
    padding: 10,
    marginLeft: 150,
    marginRight: 150,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: '#A896CF',
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    
  },
  
  textButton: {
    color: 'white',
    fontSize: 13,
  },
  
  logout: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: '#A896CF',
    height: 30,
    width: 130,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    
  },
  delete:{
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'palevioletred',
    height: 30,
    width: 195,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    marginBottom: 15,
  },

  cache: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  },
   

  textlogout: {
    color: 'white',
    fontSize: 12,
  },
  textDelete:{
    color: 'white',
    fontSize: 12,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 300,
    height: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  
  photocontainer: {
    justifyContent: 'flex-end',
  },
  yes: {
    width : 100,
    height : 50,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: '#74D48F',
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    alignItems: "center",
    margin: 10, 

  },
  not: {
    width : 100,
    height : 50,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: '#A896CF',
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    alignItems: "center",
    margin: 10, 

  },
  ouiounon: {
    flexDirection: 'row',
    justifyContent: "space-beetween"
  },
  
});