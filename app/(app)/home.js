import { View, Text, TextInput, Image, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';


export default function Home() {
  const router = useRouter();
  const {logout, user} = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    if (user?.uid)
          getUsers();
  },[])
  const getUsers = async ()=>{
    //fetch users logic
    const q = query(usersRef, where('userId', '!=', user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc=>{
       data.push({...doc.data()});
    });

   setUsers(data);
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      { 
        users.length>0? (
          <View style={styles.container}>
         
    
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={20} color="black" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="black"               
              />
            </View>
          </View>
    
          <ChatList currentUser={user} users={users} />
    
          <View style={styles.bottomBar}>
              <TouchableOpacity 
                style={styles.bottomBarItem}
              
              >
                <Ionicons name="chatbubble" size={24} color="black" />
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>9+</Text>
                </View>
                <Text style={styles.bottomBarText}>Chats</Text>
              </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push('CallScreen')}
              style={styles.bottomBarItem}
              
            >
              <MaterialCommunityIcons name="phone" size={24} color="black" />
              <Text style={styles.bottomBarText}>Calls</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push('stories')}
              style={styles.bottomBarItem}
              
            >
              <MaterialIcons name="web-stories" size={24} color="black" />
              <Text style={styles.bottomBarText}>Stories</Text>
            </TouchableOpacity>
          </View>
        </View>
        ):(
            <View className="flex items-center" style={{top: hp(30)}}>
                <Loading size={hp(10)} />
            </View>
        )
      }
    </View>
    

    //Obed's Ui design
    

  )
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
  },
  headerItem: { color: 'black', fontSize: 18 },
  activeHeader: { fontWeight: 'bold' },
  searchContainer: { padding: 10, backgroundColor: 'white' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 10,
  },
  searchInput: { color: 'black', marginLeft: 10, flex: 1 },
  chatsContainer: { flex: 1 },
  message: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  logoContainer: { marginRight: 10 },
  logo1: { width: 40, height: 40, borderRadius: 100 },
  logo: { width: 40, height: 40 },
  logoBackground: { backgroundColor: '#FFFFFF', borderRadius: 100, padding: 5 },
  messageContent: { flex: 1 },
  sender: { color: 'black', fontSize: 16, fontWeight: 'bold' },
  messageText: { color: '#555555' },
  messageDetails: { alignItems: 'flex-end' },
  time: { color: '#555555', fontSize: 12 },
  unreadCount: { backgroundColor: '#00d1d1', borderRadius: 10, paddingHorizontal: 5, marginTop: 5 },
  unreadText: { color: 'white', fontSize: 12 },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bottomBarItem: { alignItems: 'center' },
  bottomBarText: { color: 'black', fontSize: 12, marginTop: 5 },
  unreadBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#00d1d1',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  unreadBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  verifiedBadge: { marginLeft: 6 },
});