import React, {useState, useEffect} from 'react';
import FormulaireComponent from './src/component/FormulaireComponent';
import Header from './src/component/header';
import LocationComponent from './src/component/LocationComponent';
import {View, Text, StyleSheet } from 'react-native'
import * as Location from 'expo-location';
import { sendData } from './src/utils/function';
export default function App() {
  const [ipAddress, setIpAddress] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const [location, setLocation] = useState(null)
  const [status, setStatus] = useState('')
  
  /*Request Location Permission : call in useEffect */
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

  useEffect(() => {(async () => 
    {
      if(isLocating == true){
        if (status !== 'granted') {
          console.log('Permission to access location was denied')
        } 
        else
        {
          const locationSubscription = await Location.watchPositionAsync({
              accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1,
          }, async (newLocation) => {
              console.log(newLocation);
            // changing the value in state location
              //setLocation(newLocation)
            // construct the data to send  
              // const data = {
              //   'gpsDeviceId' : 'gps222222',
              //   'lng': newLocation.coords.longitude,
              //   'lat': newLocation.coords.latitude
              // }
              // console.log("ipAdress ***" + ipAddress)
              // send the data
              //await sendData(ipAddress, data)
          })
        }
        return () => locationSubscription.remove()
      }
    })()}, [isLocating, location])


  useEffect(() => {
    if(location != null){
        console.log('**** new location ****')
        console.log(location.coords.longitude + ',' + location.coord.latitude)
    }
    
  }, [location])
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






  return (
      <View style={styles.container}>
        <Header stopLocating={stopLocating}/>
        <View style={styles.formContainer}>
          {isLocating ? 
            (<LocationComponent location={location}/> ) : 
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