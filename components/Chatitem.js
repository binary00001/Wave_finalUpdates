import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash, formatDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Chatitem({ item, router, noBorder , currentUser}) {

  const [lastMessage, setLastMessage] = useState(undefined);
  useEffect(()=>{

    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy('createdAt', 'desc'));

    let unsub = onSnapshot(q, (snapshot)=>{
      let allMessages = snapshot.docs.map(doc=>{
        return doc.data();
      });
      setLastMessage(allMessages[0]? allMessages[0]: null);
    });
    return unsub;
  },[]);

  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: { ...item } });
  };

  const renderTime = ()=>{
    if(lastMessage){
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  }

  const renderLastMessage =()=>{
    if(typeof lastMessage=='undefined') return 'Loading...'
    if (lastMessage) {
      if(currentUser?.userId ==lastMessage?.userId) return "You: "+ lastMessage?.text;
      return lastMessage?.text;
    } else {
      return 'Say Hi...👋' ;
    }
  }


  return (
    <TouchableOpacity
      style={[
        styles.container,
        noBorder ? null : styles.border
      ]}
      onPress={openChatRoom}
    >
      <Image
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
        style={[styles.avatar, { height: hp(6), width: hp(6) }]}
      />

      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={[styles.name, { fontSize: hp(1.8) }]}>{item?.username}</Text>
          <Text style={[styles.time, { fontSize: hp(1.6) }]}>
            {renderTime()}
          </Text>
        </View>
        <Text style={[styles.message, { fontSize: hp(1.6) }]}>{renderLastMessage()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    alignItems: 'center',
    marginBottom: hp(1),
    paddingBottom: hp(0.5),
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  avatar: {
    borderRadius: hp(3), // This makes it round if height and width are equal
  },
  textContainer: {
    flex: 1,
    marginLeft: wp(3),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontWeight: '500',
    color: '#888',
  },
  message: {
    fontWeight: '500',
    color: '#888',
  },
});
