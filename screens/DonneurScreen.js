import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import LikesCard from "../components/LikesCard";
import { localFetch } from "../localFetch";
import { useIsFocused } from '@react-navigation/native';


export default function DonneurScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [objectData, setObjectData] = useState([]);
  let focus = useIsFocused()


  useEffect(() => {
    fetch(`${localFetch}/users/${user.token}/object`)
      .then((response) => response.json())
      .then((data) => {
        // setObjectData(data[0].likedBy);
        // console.log(data[0].likedBy);
        const allObject = data.map((item, key) => {
          return {
            title: item.title,
            image: item.image,
            likedBy: item.likedBy,
            id: item.id
            // uniqid: item.uniqid
            // avatar: item.likedBy[key].avatar,
            // username: item.likedBy[key].username,
          };
        });
        setObjectData(allObject);
      });
  }, [user.numberWhoLiked, focus]);

  const objet = objectData.map((data, i) => {

    return data.likedBy.map((item, key) => {
      return (
        <LikesCard style={styles.likeCard}
          key={key}
          title={data.title}
          // uniqid={data.uniqid}
          phone={item.phone}
          avatar={item.avatar}
          image={data.image}
          username={item.username}
          token={item.token}
          id={data.id}
        />
      );
    });
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D7C4AB", "white"]} style={styles.background} />
      <View style={styles.header}>
        <FontAwesome
          name="angle-left"
          style={styles.iconTop}
          size={40}
          color={"black"}
          onPress={() => navigation.navigate("Likes")}
        />
        <Text style={styles.headerText}>MES DONS</Text>
        <FontAwesome
          name="exchange"
          style={styles.iconTop2}
          size={31}
          color={"black"}
          onPress={() => navigation.navigate("Likes")}
        />
      </View>
      <ScrollView>

      <View>{objet}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },

  // Style pour l'en-tête
  header: {
    borderBottomWidth: 1,
    marginTop: 50,
    marginLeft:0,
    padding: 10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "800",
  },
  
  arrowLeft: {
    paddingLeft: 10,
    paddingTop: 50,
   },

  // Style pour chaque composant
  div: {
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
  accepted: {
    marginTop: 10,
    // justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB",
    // borderWidth:1
    // borderWidth: 1,
    // flexDirection: 'column',
  },
  iconTop: {
    paddingLeft: 10,
    paddingBottom: 2,
  },
  iconTop2: {
    paddingRight: 10,
    paddingBottom: 2,
  },

});
