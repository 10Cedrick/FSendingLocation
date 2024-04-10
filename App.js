import React, {useState, useEffect} from 'react';
import FormulaireComponent from './src/component/FormulaireComponent';
import Header from './src/component/header';
import LocationComponent from './src/component/LocationComponent';
import {View, Text, StyleSheet } from 'react-native'
import * as Location from 'expo-location';
import axios from 'axios'

export default function App() {
  const [ipAddress, setIpAddress] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const [location, setLocation] = useState(null)
  const [status, setStatus] = useState('')
  
  /*Request Location Permission */
  useEffect(() => {
    requestLocationPermission();
  }, []);

  /*test*/
  useEffect(() => {
    // console.log("*** Status ***")
    // console.log(status)
  }, [status])

  useEffect(() => {
    // console.log("*** IpAdress ***")
    // console.log(ipAdress)
  }, [ipAddress])

  useEffect(() => {
    // console.log("**** isLocating")
    // console.log(isLocating)
  }, [isLocating])


  const handleChangeIp = (newIP) => {
    setIpAddress(newIP)
  }
  const startLocating = () => {
    setIsLocating(true)
  }
  const stopLocating = () => {
    setIsLocating(false)
  }
  const changeLocation = (newLocation) => {
    setLocation(newLocation)
  }

  
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status)
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'L\'application a besoin de votre permission pour accéder à votre position.');
      }
      
    } catch (error) {
      console.error('Erreur de permission:', error);
    }
  };


  const sendData = async (data) => {
    try{
        const url = ipAddress + "/position"
        const res = await axios.post(url, data)
        
    }catch (error){
        console.error(error);
    }
  }
  return (
      <View style={styles.container}>
        <Header stopLocating={stopLocating}/>
        <View style={styles.formContainer}>
          {isLocating ? 
            (<LocationComponent location={location} changeLocation={changeLocation} /> ) : 
            ( <FormulaireComponent ipAddress={ipAddress} handleChangeIp={handleChangeIp} startLocating={startLocating}/>
          )} 
          
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer:{
    flex: 1,
    paddingHorizontal: 25
  }

} )