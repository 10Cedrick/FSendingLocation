import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

function LocationComponent({location}) {
  const handleSubmit = () => {
  }
  return (
    <View style={styles.container}>
      <Icon name="location-sharp" size={200} color="#9370DB" />
      <View style={styles.positionContainer}>
        {location ? 
          (
              <View>
                  <Text style={styles.centeredText}>
                    latitude: {location.coords.latitude} 
                  </Text>
                  <Text style={styles.centeredText}>
                    longitude: {location.coords.longitude}
                </Text>
              </View>
          ) : 
          (
              <View>
                <Text style={styles.centeredText}>Loading position ...</Text>
              </View>)}
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Stop localisation</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%', 
    paddingTop: 100,
    position: 'relative',
  },
  positionContainer : {
    marginTop: 25
  },
  centeredText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#9370DB', // Couleur bleue avec 50% de transparence
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
})

export default LocationComponent
