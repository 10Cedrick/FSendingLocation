import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Header({stopLocating})
{
    const handlePress = () => {
      stopLocating()
    }
    return (
      <View style={styles.header}>
        <TouchableOpacity styles={styles.backArrow} onPress={handlePress}>
          <Icon name="arrow-back" size={20} color="white" />
         </TouchableOpacity>
      </View>  
    )
}

const styles = StyleSheet.create({
    header: {
      header: 80,
      paddingTop: 45,
      paddingBottom: 20,
      paddingHorizontal: 25,
      backgroundColor: '#9370DB',
      marginBottom: 30
    },
    
  
  });