import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";


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
 {image: ['https://cdn.sklum.com/fr/wk/2461957/chaise-avec-accoudoirs-en-bois-de-style-lali.jpg','https://cdn.sklum.com/fr/wk/2461957/chaise-avec-accoudoirs-en-bois-de-style-lali.jpg'], title:'Chaise', condition: 'à bricoler', description : 'blablabla il est super jolie'},
 {image: ['https://cdn.themasie.com/fr/2065886/lampara-de-mesa-de-hierro-o20-seta.jpg','https://cdn.themasie.com/fr/2224880/lampara-de-mesa-de-hierro-o20-seta.jpg'], title:'Lampe', condition: 'bon état', description : 'blablabla il est super jolie'},
 {image: ['https://cdn.shopify.com/s/files/1/0571/4673/6685/products/2346-033-0004-1_3000x.jpg?v=1658850311','https://cdn.shopify.com/s/files/1/0571/4673/6685/products/2346-033-0004-1_3000x.jpg?v=1658850311'], title:'Set de couvert', condition: 'super état', description : 'blablabla il est super jolie'},
   ];

   const [currentItemIndex, setCurrentItemIndex] = useState(0);
   const [carrItemIndex, setCarrItemIndex] = useState(0);


  const handleDislike = () => {   // clic sur le bouton X
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % photosData.length); // affiche le prochain element du tableauu
    setCarrItemIndex(0)
  };
  
  const handleLike = () => {  // clic sur le bouton COEUR
  }


  const pagination = () => {
    // Pagination pour chaque objet
    if (photosData[currentItemIndex]) {
      return (
        <Pagination
          dotsLength={photosData[currentItemIndex].image.length}
          activeDotIndex={carrItemIndex}
          containerStyle={styles.pagination}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inactiveDot}
          carouselRef={carouselRef} // Référence au carousel pour synchroniser la pagination
        />
      );
    }
  };
  
  const carouselRef = React.createRef();
      
  
  return (
    <SafeAreaView style={styles.container}>

        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <Header />

        <Text style={styles.headertext}>Quoi de neuf par chez moi ?</Text>

        <ScrollView style={styles.galleryContainer}>
          <View style={styles.photoContainer}>
              <Carousel
                    data={photosData[currentItemIndex].image}
                    renderItem={({ item }) => (
                      <View style={styles.carouselItem}>
                        <Image source={{ uri: item }} style={styles.photo} />
                      </View>
                    )}
                    sliderWidth={300}
                    itemWidth={300}
                    layout={'default'}
                    onSnapToItem={(index) => setCarrItemIndex(index)}
                  />
                {pagination()}

                <Text style={styles.title}>{photosData[currentItemIndex].title}</Text>
                <Text style={styles.condition}>{photosData[currentItemIndex].condition}</Text>
                <Text style={styles.description}>{photosData[currentItemIndex].description}</Text>
          </View>
        </ScrollView>  

            
        <View style={styles.likeornot}>
            <Icon name="times" onPress={handleDislike} size={180} color='#A896CF'/>
            <FontAwesome name='heart' onPress={handleLike} style={styles.heart} size={155} color='#74D48F' /> 
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
  galleryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 60,
    backgroundColor : 'white',
    borderRadius: 18,
    
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  photo: { 
    width: 300,
    height: 300,
    borderRadius: 18,
    borderWidth: 10,
    borderColor: 'white',
  },
  namepage: {
    marginTop: 50,
  },
  title: {
    fontSize : 24,
    fontWeight: 'bold'
  },
  condition: {
    fontSize : 18,
    fontStyle: 'italic'
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
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
   
  },
  carouselItem: {

  },
  dot: {
    width: 8,  // Taille des dots inactifs
    height: 8,
    borderRadius: 4, // Pour les rendre ronds
    backgroundColor: 'black', // Couleur des dots inactifs
  },
  activeDot: {
    width: 10, // Taille du dot actif
    height: 10,
    borderRadius: 5, 
    backgroundColor: 'darkgray', // Couleur du dot actif
  },
  inactiveDot: {
    width: 10, // Taille des dots inactifs
    height: 8,
    borderRadius: 5,
    backgroundColor: 'darkgray', // Couleur des dots inactifs
  },

 
});