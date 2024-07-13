import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';



const CallsScreen = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigation = useNavigation();
  const router = useRouter();

  const openContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();
      if (data.length > 0) {
        console.log(data);
        // Navigate to a contacts screen or handle the contacts data as needed
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image  style={styles.logo1} />
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('All')}>
            <Text style={[styles.tab, activeTab === 'All' && styles.activeTab]}>All</Text>
            {activeTab === 'All' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Missed')}>
            <Text style={[styles.tab, activeTab === 'Missed' && styles.activeTab]}>Missed</Text>
            {activeTab === 'Missed' && <View style={styles.activeTabUnderline} />}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={openContacts}>
          <MaterialCommunityIcons name="phone-plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={20} color="black" />
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="black" />
        </View>
      </View>

      <View style={styles.mainContent}>
        {activeTab === 'All' ? (
          <>
            <Text style={styles.noCallsText}>No recent calls</Text>
            <Text style={styles.subText}>Get started by calling a friend</Text>
          </>
        ) : (
          <>
            <Text style={styles.noCallsText}>No missed calls</Text>
          </>
        )}
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={()=> router.push('home')} style={styles.bottomBarItem}>
          <Ionicons name="chatbubble" size={24} color="black" />
          <Text style={styles.bottomBarText}>Chats</Text>
        </TouchableOpacity>
        <View style={styles.bottomBarItem}>
          <MaterialCommunityIcons name="phone" size={24} color="black" />
          <Text style={styles.bottomBarText}>Calls</Text>
        </View>
        <TouchableOpacity onPress={()=> router.push('stories')} style={styles.bottomBarItem}>
          <MaterialIcons name="web-stories" size={24} color="black" />
          <Text style={styles.bottomBarText}>Stories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
  },
  activeTab: {
    fontWeight: 'bold',
  },
  activeTabUnderline: {
    height: 2,
    backgroundColor: '#03B620',
    marginTop: 4,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCallsText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#777',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bottomBarItem: {
    alignItems: 'center',
  },
  bottomBarText: {
    color: 'black',
    fontSize: 12,
    marginTop: 5,
  },
  logo1: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default CallsScreen;
