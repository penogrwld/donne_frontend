import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { localFetch } from "../localFetch";
import { removeWhoLiked } from "../reducers/user";
import { Linking } from 'react-native';

export default function DonneurCard(props) {
  const user = useSelector((state) => state.user.value);
  const [accepted, setAccepted] = useState(false);

  const dispatch = useDispatch();

  const handleAccept = () => {
    setAccepted(!accepted);
  };


  const handlePhoneCall = () => {
    const phoneNumber = `tel:0${props.phone}`;
  
    Linking.openURL(phoneNumber)
      .then(() => {
        // L'appel a été lancé avec succès
      })
      .catch((error) => {
        console.error(`Erreur lors du lancement de l'appel : ${error}`);
      });
  };

  const handleValid = () => {
    if (!user.token) {
      return;
    }
    fetch(`${localFetch}/users/catch/${props.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ object: props.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log('Félicitation pour votre donation');
        } else {
          console.error(`Erreur mec`);
        }
        dispatch(removeWhoLiked());
      })
  };


  const handleRefuse = () => {
    if (!user.token) {
      return;
    }
    fetch(`${localFetch}/users/dislike/${props.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ object: props.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log('objet a été retiré de la liste des "aimés"');
        } else {
          console.error(`Erreur mec`);
        }
        dispatch(removeWhoLiked());
      });
  };

  return (
    <View>
      {!accepted ? (
        <View style={styles.card}>

<View style={styles.left}>
          <Image style={styles.imgItem} source={{ uri: props.image }} />
          
          <Image
                style={styles.imgUser}
                source={{ uri: props.avatar }}
          />
  </View>        


          <View style={styles.textes}>
              <Text style={styles.titleText}>{props.title}</Text>
              <Text style={styles.textaccept}>Acceptez-vous de donner cet objet à {props.username} ?</Text>

              <View style={styles.buttonsOne}>
                      <TouchableOpacity
                        style={styles.buttonNo}
                        onPress={() => handleRefuse()}
                      >
                        <Text style={styles.text}>NON</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonYes}
                        onPress={() => handleAccept()}
                      >
                        <Text style={styles.text}>OUI</Text>
                      </TouchableOpacity>
              </View>
          </View>
        </View>
      ) : (
        <View style={styles.acceptContainer}>
          {/* {!valid ? ( */}
            <View style={styles.phone}>
              <Text>
                Contactez {props.username} au numéro suivant:
              </Text>
              <TouchableOpacity onPress={handlePhoneCall}>
                 <Text style={styles.phoneNumber}>0{props.phone}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.accepted}>
              <Text>La donation a-t-elle été effectuée ?</Text>
              <View style={styles.buttonsTwo}>
                <TouchableOpacity
                  style={styles.buttonNo}
                  onPress={() => handleAccept()}
                >
                  <Text style={styles.text}>NON</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonYes}
                  onPress={() => handleValid()}
                >
                  <Text style={styles.text}>OUI</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row',
    height: 200,
    margin: 20,
    flexWrap: 'wrap',
    paddingTop: 20,
    backgroundColor: 'rgba(255 255 255 / 0.9)',
    shadowColor: 'gray', // Ajout de l'ombre
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 10,
  },
  div: {
    flexDirection: "column",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#BBBBBB",
    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB",
  },
  imgItem: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imgUser: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 10,
  },
  textes: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    marginLeft: 20,
    
  },
  titleText: {
    fontWeight: "700",
    marginBottom: 10,
    textAlign: 'center',
  },

  textaccept: {
    marginLeft: 10,
    textAlign: 'center',

  },

  // Style des boutons
  text: {
  color: 'white',
  fontWeight: 'bold'
},

  buttonsOne: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 160,
    marginTop: 30,
  },
  buttonsTwo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  buttonNo: {
    backgroundColor: "#A896CF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    width: 70,
    height: 50,
  },
  buttonYes: {
    backgroundColor: "#74D48F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    width: 70,
    height: 50,
  },
  acceptContainer: {
    height: 200,
    margin: 10,
    paddingTop: 20,
    backgroundColor: 'rgba(255 255 255 / 0.9)',
    shadowColor: 'gray', // Ajout de l'ombre
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 10,
  },
  phone: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  accepted: {
    alignItems: "center",
    justifyContent:'space-between',
  },
  phoneNumber: {
    color: 'blue',
    textDecorationLine: 'underline',

  },

});
