import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Card(props) {
  return (
    <View>
       <Image style={styles.image} src={props.image} />
       <View alt={props.title}></View>
       <View style={styles.textcontainer}>
           <View alt={props.localisation}></View>
           <View alt={props.condition}></View>
       </View>
    </View>
  )
}