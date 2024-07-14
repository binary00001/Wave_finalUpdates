import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function AudioCall() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <Text style={styles.callerName}>John Doe</Text>
      <Text style={styles.callStatus}>Calling...</Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="mic-off" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="volume-x" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endCallButton}>
          <Feather name="phone-off" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  callerName: {
    color: 'white',
    fontSize: 24,
    marginVertical: 10,
  },
  callStatus: {
    color: 'gray',
    fontSize: 18,
    marginBottom: 30,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  controlButton: {
    backgroundColor: '#333',
    borderRadius: 30,
    padding: 15,
    marginHorizontal: 10,
  },
  endCallButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 15,
    marginHorizontal: 10,
  },
});
