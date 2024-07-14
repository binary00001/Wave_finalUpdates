import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function VideoCall() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/300' }}
        style={styles.remoteVideo}
      />
      <View style={styles.localVideoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.localVideo}
        />
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="video-off" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="mic-off" size={24} color="white" />
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideo: {
    width: '100%',
    height: '80%',
    position: 'absolute',
  },
  localVideoContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  localVideo: {
    width: 100,
    height: 150,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
