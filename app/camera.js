import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
      // Navigate to another screen to preview or use the photo
      router.push('StoryPreview', { photoUri: photo.uri });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('previousScreen')}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Feather name="refresh-ccw" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <Feather name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  flipButton: {
    alignSelf: 'flex-end',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -35,
  },
  captureButton: {
    backgroundColor: '#00d1d1',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
