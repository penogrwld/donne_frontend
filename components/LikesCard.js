import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

export default function DonneurCard(props) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(!accepted);
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
            <TouchableOpacity style={styles.buttonNo}>
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
        <View style={styles.accepted}>
          <Text>La donation a-t-elle été effectuée ?</Text>
          <View style={styles.buttonsTwo}>
            <TouchableOpacity
              style={styles.buttonNo}
              onPress={() => handleAccept()}
            >
              <Text>NON</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonYes}>
              <Text>OUI</Text>
            </TouchableOpacity>
          </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB",
    borderWidth: 1,
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
    // borderWidth: 1,
    marginTop: 30,
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
});
