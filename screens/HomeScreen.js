import { View, Text, SafeAreaView, StyleSheet,} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

import ItemCard from "../components/ItemCard";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
        <FontAwesome5 name="arrow-left" onPress={() => navigation.navigate('Choices')} size={28} color="#000" />
    </View>
  );
};

export default function HomeScreen() {

  const photosData = [
      {image: ['https://www.monsieur-meuble.com/wp-content/uploads/2021/03/Table_treteaux_Garance_3quart.jpg','https://www.monsieur-meuble.com/wp-content/uploads/2021/03/Table_treteaux_Garance_3quart.jpg'], title:'Table', condition: 'super état', description : 'blablabla il est super jolie'},
      {image: ['https://cdn.sklum.com/fr/wk/2461957/chaise-avec-accoudoirs-en-bois-de-style-lali.jpg'], title:'Chaise', condition: 'à bricoler', description : 'blablabla il est super jolie'},
      {image: ['https://cdn.themasie.com/fr/2065886/lampara-de-mesa-de-hierro-o20-seta.jpg','https://cdn.themasie.com/fr/2224880/lampara-de-mesa-de-hierro-o20-seta.jpg'], title:'Lampe', condition: 'bon état', description : 'blablabla il est super jolie'},
      {image: ['https://cdn.shopify.com/s/files/1/0571/4673/6685/products/2346-033-0004-1_3000x.jpg?v=1658850311','https://cdn.shopify.com/s/files/1/0571/4673/6685/products/2346-033-0004-1_3000x.jpg?v=1658850311','https://cdn.shopify.com/s/files/1/0571/4673/6685/products/2346-033-0004-1_3000x.jpg?v=1658850311'], title:'Set de couvert', condition: 'super état', description : 'blablabla il est super jolie'},
  ];

  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const card =  [photosData[currentItemIndex]].map( data => {
      return <ItemCard key={data.title} item = {data} /> 
  }); 
  

  const handleDislike = () => {   // clic sur le bouton X
    setCurrentItemIndex((currentItemIndex + 1) % photosData.length); // affiche le prochain element du tableauu
    
  };
  
  const handleLike = () => {  // clic sur le bouton COEUR
  };
      
  return (
    <SafeAreaView style={styles.container}>

        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <Header />

        <Text style={styles.headertext}>Quoi de neuf par chez moi ?</Text>
        
        {card}       
            
        <View style={styles.likeornot}>
            <Icon name="times" onPress={handleDislike} style={styles.cross} size={160} color='#A896CF'/>
            <FontAwesome name='heart' onPress={handleLike} style={styles.heart} size={138} color='#74D48F' /> 
        </View>

    </SafeAreaView>
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
  likeornot: {
    flexDirection: 'row',
    width: 400,
    height : 200,
    justifyContent: 'space-around',
    
  },
  namepage: {
    marginTop: 50,
  },
  header: {
    width: '100%',
    borderBottomWidth: 1,
    margin: 30,
    padding: 20,
    justifyContent: "flex-start",
    flexDirection: 'row',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 24,
    paddingBottom: 10,
    marginBottom: 10,
  },
  heart: {
    paddingTop: 13,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Couleur de l'ombre
    textShadowOffset: { width: 1, height: 2 }, // Décalage de l'ombre
    textShadowRadius: 3, // Rayon de l'ombre
  },
  cross : {
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Couleur de l'ombre
    textShadowOffset: { width: 1, height: 2 }, // Décalage de l'ombre
    textShadowRadius: 3, // Rayon de l'ombre

  }

});