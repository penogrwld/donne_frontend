import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
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

export default function UserScreen({navigation}) {


  const user = useSelector((state) => state.user.value)
  const image = useSelector((state)=> state.image.value)
  const dispatch = useDispatch()



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
    fetch(`https://${localFetch}/users/${user.token}/object`)
    .then((response) => response.json())
    .then(data => {
      setDon(data)
    });

    fetch(`https://${localFetch}/users/${user.token}`)
    .then((response) => response.json()) 
    .then(data => {
      setCatchs(data.finalObj.catchs)
    })

  }, [user.numberGifts]);

const allObject = don.map((item, i) => {
  return <Dons key= {i} image= {item.image} />
});

const allCatchs = catchs.map((obj, j) => {
  console.log(obj)
  return <Catchs key = {j} catch= {obj} />
});


  const handleRemove = () => {
    fetch(`https://${localFetch}/users/remove/${user.token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(dispatch(removeProfilePic()))
  }



  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.header}>
        {/* <FontAwesome name='arrow-left' size={32} color={'black'} onPress={() => navigation.navigate('Choices')} style={styles.arrowLeft}/> */}
        <Text style={styles.headerText}>MON COMPTE</Text>
      </View>


       <View style={styles.user}>
         <View style={styles.photos}>
         {!user.avatar ? (<TouchableOpacity style={styles.addPhoto} onPress={() => navigation.navigate("UserSnap")}>
          <Text>+</Text>
        </TouchableOpacity>) : (
          <View style={styles.deleteContainer}>
                <Image style={styles.image} source={{ uri: user.avatar }} />
                <TouchableOpacity onPress={() => handleRemove()}>
                <FontAwesome name='times-circle-o' size={20} color='#000000' style={styles.deleteIcon} />
                </TouchableOpacity>
                </View>)}
         </View>

         <View style={styles.infos}>
         <Text>{user.firstname} {user.lastname}</Text>
         <Text>{user.email}</Text>
         <TouchableOpacity style={styles.logout} onPress={()=> {
          dispatch(logout())
          navigation.navigate('Si')
          }}>
          <FontAwesome name='power-off' size={17} color='white' style={styles.deleteIcon} />
          <Text style={styles.textlogout}> DECONNEXION</Text>
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
    justifyContent:"center"
  },

   headerText: {
    fontSize: 20,
    fontWeight: '800',
    paddingRight: 5,
    paddingTop: 20,
  },
  user: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  }, 
  photos: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
    height: 110,
    width: 110,
  },
  addPhoto: {
    backgroundColor: 'white',
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  
  top: {
    marginBottom: 40,
    marginTop: 80,
    borderTopWidth: 1,
    padding: 10,
  },


  infos: {
    paddingTop: 55,
    paddingRight: 50,
    },
  
  text1: {
    padding: 10,
  },
  
  objects: {
    paddingTop: 10,
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
    marginBottom: 300,
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 20,
  },
  
  image: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 50,
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
  
  catchs: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    
  },
  logout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:  'center',
    borderRadius: 20,
    marginTop: 25,
    backgroundColor: '#A896CF',
    height: 10,
    width: 120,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    
  },
  textlogout: {
    color: 'white',
    fontSize: 10,
  },

  
});