import { View, Text, Image, ScrollView, StyleSheet , } from 'react-native'
import React, { useState }  from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default function ItemCard(props) {

    const [carrItemIndex, setCarrItemIndex] = useState(0);

    const pagination = () => {
        // Pagination pour chaque objet
        if (props.item) {
          return (
            <Pagination
              dotsLength={props.item.image.length}
              activeDotIndex={carrItemIndex}
              containerStyle={styles.pagination}
              dotStyle={styles.dot}
              inactiveDotStyle={styles.inactiveDot}
              
            />
          );
        }
      };

  return (

    <ScrollView style={styles.galleryContainer}>
    <View style={styles.photoContainer}>
        <Carousel
              data={props.item.image}
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
         <View style={styles.textcontainer}>

          <Text style={styles.title}>{props.item.title}</Text>

          <Text style={styles.condition}>{props.item.condition}</Text>
          
          <Text style={styles.description}>{props.item.description}</Text>
        
          <Text style={styles.description}>{props.item.localisation.city}</Text>

         </View>
          
    </View>
  </ScrollView> 
  )
}

const styles = StyleSheet.create({

    galleryContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      paddingBottom: 40,
      backgroundColor : 'white',
      borderRadius: 18,
      
    },
    photoContainer: {
      alignItems: 'center',
      justifyContent: 'space-around',
      width: 300,
  
    },
    photo: { 
      width: 300,
      height: 250,
      borderRadius: 18,
      borderWidth: 10,
      borderColor: 'white',
    },

    title: {
      fontSize : 24,
      fontWeight: 'bold'
    },
    condition: {
      fontSize : 18,
      fontStyle: 'italic'
    },
    description: {
      flexWrap: 'wrap',
    },
    carouselItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagination: {
     
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
    textcontainer: {
      alignItems: 'center',
      
    }
  
   
  });