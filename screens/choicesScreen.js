import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function choicesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
      <TouchableOpacity>
      <Text>JE DONNE</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text>JE TROUVE</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    
  }
});