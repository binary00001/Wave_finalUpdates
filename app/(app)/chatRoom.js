import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, Entypo } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import { getRoomId } from '../../utils/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../../context/authContext';

export default function ChatRoom() {
  const params = useLocalSearchParams(); // second user
  const { user } = useAuth(); // logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef('');
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, params?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy('createdAt', 'asc'));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      'KeyboardDidShow', updateScrollView
    )
    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    }

  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  }

  const createRoomIfNotExists = async () => {
    // roomId
    let roomId = getRoomId(user?.userId, params?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, params?.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messageRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      });
    } catch (err) {
      Alert.alert('Message Send Failed', err.message);
    }
  }

  const handleFeatureNotAvailable = () => {
    Alert.alert('Feature under development');
  }

  return (
    <CustomKeyboardView inChat={true}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <ChatRoomHeader user={params} router={router} />
        <View style={styles.borderline} />
        <View style={styles.messageContainer}>
          <View style={styles.messageListContainer}>
            <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.iconButton}>
                <Entypo name="attachment" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
              <TextInput
                ref={inputRef}
                onChangeText={value => textRef.current = value}
                placeholder='Type message...'
                style={styles.textInput}
              />
              <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.iconButton}>
                <Feather name="smile" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  borderline: {
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#929499',
    width: '100%',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
  },
  messageListContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: hp(1.7),
    paddingTop: hp(1),
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 25,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    alignItems: 'center',
    marginHorizontal: wp(3),
  },
  textInput: {
    flex: 1,
    fontSize: hp(2),
    marginHorizontal: wp(2),
  },
  iconButton: {
    padding: wp(1),
  },
  sendButton: {
    backgroundColor: '#e6e6e6',
    padding: wp(2),
    borderRadius: 25,
    marginLeft: wp(1),
  },
});
