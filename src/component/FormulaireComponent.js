import React, {useState} from 'react'

import {View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
function FormulaireComponent({ipAddress, handleChangeIp, startLocating}) {
    

    const handleSubmit = () => {
      startLocating()
    }

    const saveIpAddress = async () => {
      

    }
  return (
    <View style={styles.container}>
        <Text style={styles.label}>IP du serveur :</Text>
        <TextInput
        style={styles.input}
        placeholder="ex : 198.168.96.2"
        onChangeText={(text) => handleChangeIp(text)}
        value={ipAddress}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Start localisation</Text>
        </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 100,
      width: '100%',
      position: 'relative'
    },
    label: {
      fontSize: 18,
      marginBottom: 5,
    },
    ipAddress: {
      fontSize: 16,
      marginBottom: 15,
      color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 15,
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
  });
export default FormulaireComponent
