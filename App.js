import React, {useState, useEffect} from 'react';
import Header from './src/component/header';
import FormGpsComponent from './src/component/FormGpsComponent';
import FormulaireComponent from './src/component/FormulaireComponent';
import LocationComponent from './src/component/LocationComponent';
import {View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [ipAddress, setIpAddress] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const [location, setLocation] = useState(null)
  const [status, setStatus] = useState('')
  const [id, setId] = useState('')
  const [imei, setImei] = useState('')
  const [gpsInfo, setGpsInfo] = useState(null)

  // Function
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
 
  const storeServerAdress = async () => {
    try{
      await AsyncStorage.setItem('ipAdress', ipAddress);
      /*
      ***** Test Async Storage *****
      const savedIP = await AsyncStorage.getItem('ipAdress')
      console.log('Ip adress saved successfully : ' + savedIP);*/ 
    }catch(error){
      console.error('Error while saving ipAdress: ', error);
    }
  }

  
  

  const handleChangeIp = async (newIP) => {
    setIpAddress(newIP)
  }
  
  const startLocating = () => {
    setIsLocating(true)
  }
  const stopLocating = () => {
    setIsLocating(false)
  }
  



  

  /*test*/
  useEffect(() => {
    // console.log("*** Status ***")
    // console.log(status)
  }, [status])

  useEffect(() => {
    // console.log("*** IpAdress ***")
    // console.log(ipAdress)
  }, [ipAddress])






//localisation functionnality

  //Save Gps info 

  useEffect (() => {
    const storeGpsInfo = async () => {
      try{
        const jsonValue = JSON.stringify(gpsInfo);
        await AsyncStorage.setItem('gpsInfo', jsonValue);
        /****** Test Async Storage ******/
        const savedInfo = await AsyncStorage.getItem('gpsInfo')
        console.log('Information saved successfully : ' + savedInfo);
      }catch (error){
        console.error('Error while saving Gps Information', error);
      }
    }
    if(gpsInfo){
      console.log("actual gps information" + gpsInfo);
      storeGpsInfo()

    }

  }, [gpsInfo])


  //Load Gps Information 
  useEffect(() => {
    const loadGpsInfo = async () => {
      try{
        const jsonValue = await AsyncStorage.getItem('gpsInfo');
        setGpsInfo(JSON.parse(jsonValue))
      }catch (error){
        console.error("Error loading Gps Information", error);
      }
    }
    loadGpsInfo()
  }, [])

  //Load Server Ip
    useEffect(() => {
      const loadServerIp = async () => {
        try{
          const savedIP = await AsyncStorage.getItem('ipAdress')
          if(savedIP !== null){
            setIpAddress(savedIP)
          }
        }catch (error){
          console.error("Error loading server Ip", error);
        }
      }
      loadServerIp()
    }, [])

  //Request Location Permission
    useEffect(() => {
      requestLocationPermission();
    }, []);

  //Start Location Updates
    useEffect(() => {
      let locationSubscription

      const startWatching = async () => {
        if(status !== 'granted'){
            console.log("Permission to access location was denied")
        }else{
            try{
              locationSubscription = await Location.watchPositionAsync(
                {
                  accuracy: Location.Accuracy.BestForNavigation,
                  timeInterval: 1000, // 1 second
                  distanceInterval: 1, // 10 meters
                },
                (newLocation) => {
                  setLocation(newLocation);
                }
              );
            }catch (error){
              console.error('Error starting location updates:', error)
            }
        }
      }

      if(isLocating){
        startWatching()
      }
      else{
        if(locationSubscription){
          locationSubscription.remove()
        }
      }

      return () => {
        if (locationSubscription) {
          locationSubscription.remove(); // Clean up subscription on unmount
        }
      }
    }, [isLocating])   


  // track position 
  useEffect(() => {
    const sendPosition = async () => {
      if(location){
        //prepare the data
        const data = {
          'gpsDeviceId' : parseInt(gpsInfo.id),
          'imei': gpsInfo.imei,
          'lng': location.coords.longitude,
          'lat': location.coords.latitude
        }
        

        //send the data
        const url = ipAddress + '/api/positions'
        
        axios.post(url, data).then((res) => {
          console.log(res.data);
        }).catch((error) => {
          console.error(error);
        })
      }}
    sendPosition()
  })
    




  return (
      <View style={styles.container}>
        <Header stopLocating={stopLocating}/>
        <View style={styles.formContainer}>
          {!gpsInfo && <FormGpsComponent id={id} imei={imei} setId={setId} setImei={setImei} setGpsInfo={setGpsInfo} />}
          {gpsInfo && isLocating && <LocationComponent location={location} stopLocating={stopLocating}/>}
          {gpsInfo && !isLocating && <FormulaireComponent ipAddress={ipAddress} handleChangeIp={handleChangeIp} storeServerAdress={storeServerAdress} startLocating={startLocating}/>}
          
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