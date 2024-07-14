import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function StoriesFeed() {
  const router = useRouter();

  const dummyStories = [
    { id: 1, name: 'John Doe', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Jane Smith', image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Sam Wilson', image: 'https://via.placeholder.com/100' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('stories')}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        {dummyStories.map(story => (
          <TouchableOpacity key={story.id} style={styles.story} onPress={() => router.push('StoryDetail', { storyId: story.id })}>
            <View style={styles.storyBorder}>
              <Image source={{ uri: story.image }} style={styles.storyImage} />
            </View>
            <Text style={styles.storyName}>{story.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.feedContainer}>
        {dummyStories.map(story => (
          <View key={story.id} style={styles.feedItem}>
            <View style={styles.feedHeader}>
              <Image source={{ uri: story.image }} style={styles.feedProfileImage} />
              <Text style={styles.feedName}>{story.name}</Text>
            </View>
            <Image source={{ uri: story.image }} style={styles.feedImage} />
            <View style={styles.feedActions}>
              <TouchableOpacity>
                <Feather name="heart" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="message-circle" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="send" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 60,
  },
  story: {
    alignItems: 'center',
    marginRight: 10,
  },
  storyBorder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#00d1d1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    color: 'black',
  },
  feedContainer: {
    paddingHorizontal: 10,
  },
  feedItem: {
    marginBottom: 20,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  feedProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  feedName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  feedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  feedActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
