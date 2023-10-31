import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";


  export default function Dons(props){

        return (

<View style={styles.dons}>
 <Image style={styles.image} source={{ uri: props.image }}/>
</View>
    )
         };


 const styles = StyleSheet.create({

dons: {


},
image: {
    borderRadius: 50, 
    height: 100,
    width: 100,
},

 })