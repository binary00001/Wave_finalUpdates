import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';

export default function ChatRoomHeader({ user, router }) {
  const handleMoreOptions = () => {
    Alert.alert("Feature under development");
  };

  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#b3b3b3" />
            </TouchableOpacity>
            <View style={styles.userInfoContainer}>
              <Image
                source={user?.profileUrl}
                style={styles.userImage}
              />
              <Text style={styles.username}>
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerRightContainer}>
            <Ionicons name="call" size={hp(2.8)} color="#b3b3b3" />
            <Ionicons name="videocam" size={hp(2.8)} color="#b3b3b3" />
            <TouchableOpacity onPress={handleMoreOptions}>
              <Feather name="more-vertical" size={hp(2.8)} color="#737373" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  userImage: {
    height: hp(4.4),
    aspectRatio: 1,
    borderRadius: 100,
  },
  username: {
    fontSize: hp(2.5),
    color: '#737373',
    fontWeight: 'bold',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
});
