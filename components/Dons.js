import {
    View,
    StyleSheet,
    Image,
  } from "react-native";


  export default function Dons(props){

        return (

<View style={styles.dons}>
 <Image style={styles.image} source={{ uri: props.image }}/>
</View>
    )
         };


 const styles = StyleSheet.create({


image: {
    borderRadius: 50, 
    height: 100,
    width: 100,
    marginRight: 30,
},

 })