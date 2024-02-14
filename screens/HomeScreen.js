import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { localFetch } from '../localFetch';
import ItemCard from '../components/ItemCard';
import { addLike } from '../reducers/user';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [don, setDon] = useState([]);
  const [disliked, setDisliked] = useState(false);
  const [liked, setLiked] = useState(false);


  let focus = useIsFocused()

  useEffect(() => {
    fetch(`${localFetch}/objects/${user.token}/${user.latitude}/${user.longitude}`)
      .then((response) => response.json())
      .then((data) => {
        setDon(data.result);
        //setCurrentItemIndex(Math.floor(Math.random() * data.result.length));
      });
  }, [disliked, liked, focus]);     // PAUL ????



//console.log("DON ", don)
  const handleDislike = (card) => {
    
  //setDisliked(!disliked);
  };

  const handleLike = (card) => {
    console.log("CARD", card)
    fetch(`${localFetch}/users/like/${user.token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ object: card }),
    })
      .then((response) => response.json())
      .then((data) => {

console.log("REPONSE DU BACK",data)
        setLiked(!liked);
        //setDon(data.result);
        dispatch(addLike());
      }); 
  };

  const swiper = <SwipeCards
  cards={don}
  loop = {true}
  stack={false}
  stackOffsetX={0}
  renderCard={(cardData) => <ItemCard key={cardData.image[0]} item={cardData} />}
  renderNoMoreCards={() => <Text>Il n'y a plus de dons, reviens plus tard !</Text>}
  handleYup={handleLike}
  handleNope={handleDislike}
  />

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.header}></View>
      <Text style={styles.headertext}>Swipe vite pour découvrir les objets autour de toi !</Text>
  
      {swiper}

      <View style={styles.likeornot}>
        <Icon name="reply"style={styles.cross} size={90} color="#A896CF" />
        <Icon name="share" style={styles.heart} size={90} color="#74D48F" />
      </View>
    </View>
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
    height: 140,
    justifyContent: 'space-around',
  },
  namepage: {
    marginTop: 50,
  },
  header: {
    width: '100%',
    margin: 30,
    padding: 20,
    justifyContent: "center",
    flexDirection: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 21,
    paddingBottom: 5,
    marginBottom: 10,
    fontStyle: 'italic',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  swipetext: {
    fontSize: 10,
  },
  heart: {
    marginTop: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
  },
  cross: {
    marginTop: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
  },
});
