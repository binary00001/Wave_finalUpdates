import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext.js';


const StoriesScreen = () => {
  const [showStoryOverlay, setShowStoryOverlay] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const router = useRouter();
  const { user } = useAuth();


  const handleStoryClick = () => {
    setShowStoryOverlay(true);
  };

  const closeStoryOverlay = () => {
    setShowStoryOverlay(false);
  };

  const proceedToStory = () => {
    setShowStoryOverlay(false);
    // Logic to display the story images
  };

  const toggleOptionsModal = () => {
    setShowOptionsModal(!showOptionsModal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('profileScreen')}>
          <Image style={styles.logo1} source={{uri:user?.profileUrl}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stories</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push('./camera')} style={styles.cameraIcon}>
            <SimpleLineIcons name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOptionsModal} style={styles.optionsIcon}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={20} color="#777" />
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#777" />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>My Story</Text>
        <View style={styles.myStoryContainer}>
          <TouchableOpacity style={styles.addStoryContainer} onPress={() => router.push('StoriesUpdate')}>
            <Image source={{uri: 'https://via.placeholder.com/50'}} style={styles.profileImage} />
            <View style={styles.addStoryBadge}>
              <SimpleLineIcons name="plus" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.storyUserName}>My Story</Text>
        </View>

        <Text style={styles.sectionLabel}>Recent Stories</Text>
        <View style={styles.recentUpdatesContainer}>
          <View style={styles.storiesContainer}>
            <TouchableOpacity style={[styles.story, styles.newStory]} onPress={handleStoryClick}>
              <Image source={{uri: 'https://via.placeholder.com/50'}} style={styles.storyImage} />
            </TouchableOpacity>
            <View style={styles.waveAccountContainer}>
              <View style={styles.waveAccountHeader} >
                <Text style={styles.waveAccountText}>Wave</Text>
                <MaterialCommunityIcons name="check-decagram" size={14} color="#03B620" />
              </View>
              <Text style={styles.waveAccountTime}>Posted 2h ago</Text>
            </View>
          </View>
        </View>
      </View>

      {showStoryOverlay && (
        <View style={styles.storyOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={closeStoryOverlay}>
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>Tap to advance</Text>
            <Text style={styles.overlayText}>Swipe up to skip</Text>
            <Text style={styles.overlayText}>Swipe right to exit</Text>
            <TouchableOpacity style={styles.gotItButton} onPress={proceedToStory}>
              <Text style={styles.gotItButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={() => router.push('home')}
        >
          <Ionicons name="chatbubble" size={24} color="black" />
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>9+</Text>
          </View>
          <Text style={styles.bottomBarText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={() => router.push('CallScreen')}
        >
          <MaterialCommunityIcons name="phone" size={24} color="black" />
          <Text style={styles.bottomBarText}>Calls</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={() => router.push('stories')}
        >
          <MaterialIcons name="web-stories" size={24} color="black" />
          <Text style={styles.bottomBarText}>Stories</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showOptionsModal}
        animationType="slide"
        onRequestClose={toggleOptionsModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={toggleOptionsModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem} onPress={() => alert('Stories Privacy')}>
              <Text style={styles.modalItemText}>Stories Privacy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: '#2F2F2F',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraIcon: {
    marginRight: 15,
  },
  optionsIcon: {
    paddingBottom: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
    flex: 1,
  },
  sectionContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#2F2F2F',
    fontSize: 18,
    marginBottom: 10,
  },
  myStoryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  addStoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  addStoryBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#03B620',
    borderRadius: 25,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyUserName: {
    color: '#2F2F2F',
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  recentUpdatesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  recentUpdatesText: {
    color: '#2F2F2F',
    fontSize: 18,
    marginBottom: 10,
  },
  storiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  waveAccountContainer: {
    marginLeft: 10,
  },
  waveAccountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveAccountText: {
    color: '#2F2F2F',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  waveAccountTime: {
    color: '#777',
    fontSize: 12,
  },
  story: {
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 25,
    overflow: 'hidden',
  },
  newStory: {
    borderColor: '#03B620',
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  storyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  overlayContent: {
    alignItems: 'center',
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginVertical: 10,
  },
  gotItButton: {
    backgroundColor: '#03B620',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  gotItButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  bottomBarItem: { alignItems: 'center' },
  bottomBarText: { color: 'black', fontSize: 12, marginTop: 5 },
  unreadBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#03B620',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  unreadBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  logo1: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default StoriesScreen;
