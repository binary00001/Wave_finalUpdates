import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext.js';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function ProfileScreen() {
  const { user } = useAuth();

  const handleFeatureNotAvailable = () => {
    Alert.alert('Feature under development');
  };

  return (
    <View style={styles.container}>
    <View style={styles.profileContainer}>
      <Image source={{uri: user?.profileUrl }} style={styles.profileImage} />
      <View style={styles.profileDetails}>
        <Text style={styles.profileName}>{user?.username}</Text>
        <Text style={styles.profileContact}>+1234567890</Text>
        <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.iconButton}>
          <Feather name="arrow-left" size={hp(3)} color="black" />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.section}>
      <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
        <MaterialCommunityIcons name="account" size={24} color="black" />
        <Text style={styles.itemText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
        <MaterialCommunityIcons name="devices" size={24} color="black" />
        <Text style={styles.itemText}>Linked Devices</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.section}>
      <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
        <MaterialCommunityIcons name="palette" size={24} color="black" />
        <Text style={styles.itemText}>Appearance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item} >
        <MaterialCommunityIcons name="chat" size={24} color="black" />
        <Text style={styles.itemText}>Chats</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
        <MaterialIcons name="web-stories" size={24} color="black" />
        <Text style={styles.itemText}>Stories</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
        <FontAwesome name="bell" size={24} color="black" />
        <Text style={styles.itemText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
        <MaterialCommunityIcons name="shield-lock" size={24} color="black" />
        <Text style={styles.itemText}>Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
        <MaterialCommunityIcons name="database" size={24} color="black" />
        <Text style={styles.itemText}>Data Usage</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#f5f5f5',
},
profileContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#fff',
  marginBottom: 20,
},
profileImage: {
  width: 80,
  height: 80,
  borderRadius: 40,
},
profileDetails: {
  marginLeft: 20,
},
profileName: {
  fontSize: 18,
  fontWeight: 'bold',
},
profileContact: {
  fontSize: 14,
  color: '#777',
},
section: {
  backgroundColor: '#fff',
  marginBottom: 20,
  paddingHorizontal: 20,
},
item: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
itemText: {
  marginLeft: 20,
  fontSize: 16,
},
});