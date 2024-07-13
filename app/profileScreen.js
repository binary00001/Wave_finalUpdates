import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../context/authContext.js';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout functionality
    logout(); // Example logout function from context
    router.replace('/signIn'); // Example navigation to sign-in screen
  };

  const handleDeleteAccount = () => {
    // Implement delete account functionality
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => handleFeatureNotAvailable() /* Implement delete logic */ },
    ]);
  };

  const handleFeatureNotAvailable = () => {
    Alert.alert('Feature under development');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.iconButton}>
          <Feather name="arrow-left" size={hp(3)} color="black" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user?.username}</Text>
            <Text style={styles.profileContact}>Active</Text>
          </View>
          <Image source={{ uri: user?.profileUrl }} style={styles.profileImage} />
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
        <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
          <MaterialCommunityIcons name="palette" size={24} color="black" />
          <Text style={styles.itemText}>Appearance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.item}>
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

      <View style={styles.section}>
        <TouchableOpacity onPress={handleDeleteAccount} style={styles.item}>
          <Feather name="user-x" size={24} color="black" />
          <Text style={styles.itemText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.item}>
          <Feather name="log-out" size={24} color="black" />
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    marginTop:30,
    borderRadius: 40,
  },
  profileDetails: {
    marginLeft: 20,
    paddingRight: 15,
    paddingTop:18,
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

