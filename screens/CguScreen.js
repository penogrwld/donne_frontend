import { View, Text , StyleSheet, ScrollView } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CguScreen({navigation}) {
  return (
    <View style={styles.container}>
        <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
          <View style={styles.header}>
             <FontAwesome name="arrow-left" onPress={() => navigation.navigate('Su')} size={32} color="#000" />
          </View>
          <View name="Container vide"style={styles.containerVide}/>     

      <ScrollView >
      <Text name="CGU" style={styles.titre}>
    Conditions Générales d'Utilisation de l'Application Mobile DONNE
  </Text>

  <Text name="CGU" style={styles.text}>
    Dernière mise à jour : 31 Octobre 2023
  </Text>

  <Text name="CGU" style={styles.text}>
    Les présentes Conditions Générales d'Utilisation ("CGU") régissent votre utilisation de l'application mobile DONNE (ci-après dénommée "l'Application"). Veuillez lire attentivement ces CGU avant d'utiliser l'Application. En utilisant l'Application, vous acceptez d'être lié par ces CGU. Si vous n'acceptez pas ces CGU, veuillez ne pas utiliser l'Application.
  </Text>

  <Text name="CGU" style={styles.text}>
    1. Acceptation des CGU
    En utilisant l'Application, vous reconnaissez avoir lu, compris et accepté ces CGU. Si vous ne les acceptez pas, vous ne pouvez pas utiliser l'Application.
  </Text>

  <Text name="CGU" style={styles.text}>
    2. Modifications des CGU
    Nous nous réservons le droit de modifier, mettre à jour ou réviser ces CGU à tout moment. Les modifications prendront effet dès leur publication dans l'Application. Il est de votre responsabilité de vérifier régulièrement les CGU pour rester informé des éventuelles modifications. Votre utilisation continue de l'Application après toute modification des CGU constitue votre acceptation de ces modifications.
  </Text>

  <Text name="CGU" style={styles.text}>
    3. Utilisation de l'Application
    L'utilisation de l'Application est soumise au respect des lois et réglementations en vigueur. Vous vous engagez à ne pas utiliser l'Application à des fins illégales ou interdites par la loi.
  </Text>

  <Text name="CGU" style={styles.text}>
    4. Compte Utilisateur
    Pour accéder à certaines fonctionnalités de l'Application, vous pouvez être amené à créer un compte utilisateur. Vous êtes responsable de la confidentialité de votre compte et de votre mot de passe. Vous acceptez de nous informer immédiatement en cas d'utilisation non autorisée de votre compte.
  </Text>

  <Text name="CGU" style={styles.text}>
    5. Propriété Intellectuelle
    L'Application et tout le contenu qui y est associé sont la propriété exclusive de DONNE. Vous ne pouvez pas reproduire, distribuer, modifier, ou utiliser le contenu de l'Application sans autorisation préalable.
  </Text>

  <Text name="CGU" style={styles.text}>
    6. Confidentialité
    La collecte et l'utilisation de vos informations personnelles sont régies par notre Politique de Confidentialité.
  </Text>

  <Text name="CGU" style={styles.text}>
    7. Limitation de Responsabilité
    L'Application est fournie "telle quelle" et DONNE décline toute responsabilité en cas de dommages résultant de son utilisation. DONNE ne garantit pas que l'Application sera exempte d'erreurs ou de pannes.
  </Text>

  <Text name="CGU" style={styles.text}>
    8. Résiliation
    Nous nous réservons le droit de résilier ou de suspendre votre accès à l'Application à tout moment, pour quelque raison que ce soit, sans préavis.
  </Text>

  <Text name="CGU" style={styles.text}>
    9. Loi Applicable
    Ces CGU sont régies par les lois en vigueur en France et tout litige découlant de l'utilisation de l'Application sera soumis à la compétence exclusive des tribunaux de Paris.
  </Text>

  <Text name="CGU" style={styles.text}>
    Pour toute question concernant ces CGU, veuillez nous contacter.
  </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  header: {
    width: "100%",
    flexDirection:"row",
    margin: 35,
    padding: 20,
    paddingTop: 10,
  },

  containerVide:{
    flex: .4,
    aligItems:"flex-start",
  },    

  titre: {
    color:"black",
    fontSize: 15,
    margin : 10,
    fontSize: 20,
    textDecorationLine: "underline", 
  },

  text:{
    color:"black",
    fontSize: 15,
    margin : 10,
  },
  
});