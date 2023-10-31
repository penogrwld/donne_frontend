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
  const [dislike, setDislike] = useState(false);

  const dispatch = useDispatch();

  const handleAccept = () => {
    setAccepted(!accepted);
  };

  const handleValid = () => {
    setValid(!valid);
  };
  const handleRefuse = () => {
    if (!user.token) {
      return;
    }
    fetch(`http://${localFetch}/users/dislike/${props.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ object: props.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // // Traitez la réponse ici
        if (data.result) {
          // L'opération a réussi, mettez à jour l'interface si nécessaire
          setDislike(true);
          console.log('objet a été retiré de la liste des "aimés"');
        } else {
          // L'opération a échoué, affichez l'erreur si nécessaire
          setDislike(false);
          console.error(`Erreur mec`);
        }
        dispatch(removeWhoLiked());
      });
  };

  return (
    <View>
      {!accepted ? (
        <View style={styles.card}>

          <Image style={styles.imgItem} source={{ uri: props.image }} />
          
          
          <Image
                style={styles.imgUser}
                onPress={() => navigation.navigate("Profile")}
                source={{ uri: props.avatar }}
          />
          


          <View style={styles.textes}>
              <Text style={styles.titleText}>{props.title}</Text>
              <Text>Acceptez-vous de donner cet objet à {props.username} ?</Text>

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
                Contactez {props.username}  au numéro suivant:
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
  card: {
    flexDirection: 'row',
    height: 200,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    flexWrap: 'wrap',
    borderWidth: 1,
    paddingTop: 20,
    backgroundColor: 'transparent',
    shadowColor: 'gray', // Ajout de l'ombre
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 10,
  },
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
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
    // alignItems: "flex-start"
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
    width:190,
    marginLeft: 20,
  },
  titleText: {
    fontWeight: "700",
    marginBottom: 10,
  },

  // Style des boutons
  buttonsOne: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    width: 160,
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
    height: 200,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    borderWidth: 1,
    paddingTop: 20,
    backgroundColor: 'transparent',
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

});
