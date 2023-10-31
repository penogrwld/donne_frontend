import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SwipeCards from 'react-native-swipe-cards';


export default function ItemCard(props) {
  const [carrItemIndex, setCarrItemIndex] = useState(0);
  const carouselRef = useRef(null);

  const pagination = () => {
    if (props.item) {
      return (
        <View style={styles.pagination}>
          {props.item.image.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotClick(index)}
              style={[
                styles.dot,
                carrItemIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      );
    }
  };

  const handleDotClick = (index) => {
    // Fonction pour mettre à jour l'index du carrousel
    setCarrItemIndex(index);
    // Défilez vers l'élément correspondant du carrousel
    carouselRef.current.snapToItem(index);
  };

  return (
    <ScrollView style={styles.galleryContainer}>
      <View style={styles.photoContainer}>
        <Carousel
          ref={carouselRef}
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
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 18,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
  },
  photo: {
    width: 300,
    height: 350,
    borderRadius: 18,
    borderWidth: 10,
    borderColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  description: {
    flexWrap: 'wrap',
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    margin: 4,
  },
  activeDot: {
    height: 8,
    borderRadius: 50,
    backgroundColor: 'black',

  },
  inactiveDot: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: 'darkgray',
    marginRight: 20,
    marginLeft: 20,
  },
  textcontainer: {
    alignItems: 'center',
  },
});
