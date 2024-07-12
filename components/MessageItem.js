import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId === message?.userId) {
    return (
      <View style={styles.sentContainer}>
        <View style={styles.messageWrapper}>
          <View style={styles.sentMessage}>
            <Text style={styles.sentText}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.receivedContainer}>
        <View style={styles.messageWrapper}>
          <View style={styles.receivedMessage}>
            <Text style={styles.receivedText}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: hp(1.5), // mb-3 equivalent
    marginRight: wp(3), // mr-3 equivalent
  },
  receivedContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: hp(1.5), // mb-3 equivalent
    marginLeft: wp(3), // ml-3 equivalent
  },
  messageWrapper: {
    width: wp(80),
  },
  sentMessage: {
    alignSelf: 'flex-end',
    padding: wp(3), // p-3 equivalent
    borderRadius: wp(2), // rounded-2xl equivalent
    backgroundColor: '#ADD8E6', // Light blue for sent messages
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    padding: wp(3), // p-3 equivalent
    borderRadius: wp(2), // rounded-2xl equivalent
    backgroundColor: '#FFA500', // Orange for received messages
  },
  sentText: {
    color: '#000', // Black text for sent messages
  },
  receivedText: {
    color: '#000', // Black text for received messages
  },
});
