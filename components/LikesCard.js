import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { localFetch } from "../localFetch";
import { removeWhoLiked } from "../reducers/user";

export default function DonneurCard(props) {
  const user = useSelector((state) => state.user.value);
  const image = useSelector((state) => state.image.value);
  const [accepted, setAccepted] = useState(false);
  const [valid, setValid] = useState(false);
  // const [dislike, setDislike] = useState(false);

  const dispatch = useDispatch();

  const handleAccept = () => {
    setAccepted(!accepted);
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
        // // Traitez la réponse ici
        if (data.result) {
          // L'opération a réussi, mettez à jour l'interface si nécessaire
          // setDislike(true);
          console.log('Félicitation pour votre donation');
        } else {
          // L'opération a échoué, affichez l'erreur si nécessaire
          // setDislike(false);
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
        // // Traitez la réponse ici
        if (data.result) {
          // L'opération a réussi, mettez à jour l'interface si nécessaire
          // setDislike(true);
          console.log('objet a été retiré de la liste des "aimés"');
        } else {
          // L'opération a échoué, affichez l'erreur si nécessaire
          // setDislike(false);
          console.error(`Erreur mec`);
        }
        dispatch(removeWhoLiked());
      });
  };

  return (
    <View>
      {!accepted ? (
        <View style={styles.div}>
          <Image style={styles.imgItem} source={{ uri: props.image }} />
          <Image
            style={styles.imgUser}
            onPress={() => navigation.navigate("Profile")}
            source={{ uri: props.avatar }}
          />
          <Text>{props.username}</Text>
          <View style={styles.textes}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text>Acceptez-vous de donner cet objet ?</Text>
            <View style={styles.buttonsOne}>
              <TouchableOpacity
                style={styles.buttonNo}
                onPress={() => handleRefuse()}
              >
                <Text>NON</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonYes}
                onPress={() => handleAccept()}
              >
                <Text>OUI</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.acceptContainer}>
          {/* {!valid ? ( */}
            <View style={styles.phone}>
              <Text>
                Contactez l'utilisateur avec le numéro suivant:
              </Text>
              <Text>0{props.phone}</Text>
            </View>
            <View style={styles.accepted}>
              <Text>La donation a-t-elle été effectuée ?</Text>
              <View style={styles.buttonsTwo}>
                <TouchableOpacity
                  style={styles.buttonNo}
                  onPress={() => handleAccept()}
                >
                  <Text>NON</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonYes}
                  onPress={() => handleValid()}
                >
                  <Text>OUI</Text>
                </TouchableOpacity>
              </View>
            </View>
          {/* ) : (
            <View>
              <Text>
                Contactez l'utilisateur avec le numéro suivant: 0{props.phone}
              </Text>
            </View>
          )} */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Style pour chaque composant
  div: {
    // justifyContent: "space-around",
    // alignItems: "center",
    flexDirection: "column",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#BBBBBB",
    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB",
    // borderWidth: 1,
  },
  imgItem: {
    width: 70,
    height: 70,
    borderRadius: 10,
    // alignItems: "flex-start"
  },
  imgUser: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 10,
    justifyContent: "center",
  },
  textes: {
    marginLeft: 10,
  },
  titleText: {
    fontWeight: "700",
    marginBottom: 10,
  },

  // Style des boutons
  buttonsOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderWidth: 1,
    marginTop: 30,
  },
  buttonsTwo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    // borderWidth: 1,
  },
  buttonNo: {
    backgroundColor: "#A896CF",
    // padding: 20,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    // marginTop: 10,
    width: 70,
    height: 50,
  },
  buttonYes: {
    backgroundColor: "#74D48F",
    // padding: 20,
    // margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    // marginTop: 10,
    width: 70,
    height: 50,
  },
  acceptContainer: {
    margin: 10,
    // shadowColor: "#000000",
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 1
    // }
    // borderBottomWidth: 1,
    // borderTopColor: 'black'
  },
  phone: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  accepted: {
    alignItems: "center",
  },
});
