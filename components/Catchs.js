import {
    View,
    StyleSheet,
    Image,
  } from "react-native";
  import React from "react";

  export default function Catchs(props){

        return (
<View style={styles.catchs}>
 <Image style={styles.image} source={{ uri: props.catchs }}/>
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