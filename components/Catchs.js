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

  export default function Catchs(props){

        return (
<View style={styles.dons}>
 <Image style={styles.image} source={{ uri: props.catch }}/>
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
    marginRight: 30,
},

 })