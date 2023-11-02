  import { View, Text , StyleSheet, TouchableOpacity, ScrollView  } from 'react-native'
  import { LinearGradient } from "expo-linear-gradient";
  import React from 'react'

  export default function TutoScreen({navigation}) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
        <Text style={styles.textHeader}>BIENVENUE SUR DONNE ! 🫶🏼</Text>
          <ScrollView>
              <Text style={styles.text}>L'application mobile qui révolutionne la façon dont nous faisons des dons !</Text>
              <Text style={styles.text}>Imagine un monde où tu peux swiper à travers les objets à donner proche de chez toi, tout en restant confortablement installé dans ton canap'.</Text>
              <Text style={styles.textreve}>DONNE rend ce rêve réalité ! 🤩</Text>
              <Text style={styles.text}>Swipe à droite pour catcher ton objet favoris ! {'\n'}Si ta demande est acceptée, récupère l’objet directement auprès du Donneur. ✅ </Text>
              <Text style={styles.text}>Swipe à gauche si l'objet ne te plaît pas.🙃</Text>
              <Text style={styles.textreve}>⚠️ Attention, tu ne peux liker que 5 objets {'\n'} maximum en même temps.</Text>
              <Text style={styles.text}>Tu l'auras compris : si tu es donneur, tu ne seras donc pas submergé de demandes. {'\n'}Gagnant-gagnant ! 🌟</Text>
              <Text style={styles.text}>Mais n'oublions pas le principal : Chaque don est un pas vers un monde plus durable. 🌍</Text>
              <Text style={styles.textreve}>Ensemble, faisons la différence ! 💜</Text>

          </ScrollView>   
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
    textHeader:{
      color: "#A896CF",
      margin: 10,
      paddingTop : 80,
      justifyContent: "center",
      fontSize: 25,
      fontWeight: 'bold',
      
    },
    text: {
      padding: 25,
      fontSize: 16,
      textAlign: 'center',
    },
    textreve: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      fontStyle: 'italic',
      
    },
  });