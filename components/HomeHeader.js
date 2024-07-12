import React from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from "../utils/common.js";
import { useAuth } from '../context/authContext.js';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems.js';
import { Feather, MaterialIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS === 'ios';

const HomeHeader = () => {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation();

    const handleProfile = () => navigation.navigate('profileScreen');
    const handleLogout = async () => await logout();
    const handleFeatureNotAvailable = () => Alert.alert('Feature under development');

    return (
        <View style={{ paddingTop: ios ? top : top + 10 }} className="flex-row justify-between items-center px-5 bg-white-100 pb-6 rounded-b-3xl shadow">
            <View>
                <Text style={[styles.headerItem, styles.activeHeader]} className="font-medium text-white">Chats</Text>
            </View>
            <View className="flex-row items-center">
                <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.iconButton}>
                    <Feather name="camera" size={hp(2.8)} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFeatureNotAvailable} style={styles.iconButton}>
                    <Feather name="edit" size={hp(2.8)} color="black" />
                </TouchableOpacity>
                <Menu>
                    <MenuTrigger customStyles={{ triggerWrapper: { marginLeft: wp(2) } }}>
                        <Image
                            style={{ aspectRatio: 1, borderRadius: 100, width: 40, height: 40 }}
                            source={user?.profileUrl}
                            placeholder={{ blurhash }}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
                        <MenuItem
                            text="Settings"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name="user" size={hp(2.5)} color="#2206f0" />}
                        />
                        <Divider />
                        <MenuItem
                            text="Sign Out"
                            action={handleLogout}
                            value={null}
                            icon={<MaterialIcons name="logout" size={hp(2.5)} color="#e91616" />}
                        />
                    </MenuOptions>
                </Menu>
            </View>

        </View>
    );
};

const Divider = () => <View className="p-[1px] w-full bg-neutral-200" />

const styles = StyleSheet.create({
    headerItem: { color: 'black', fontSize: 18 },
    activeHeader: { fontWeight: 'bold' },
    iconButton: { marginHorizontal: 10 },
    menuOptions: {
        borderRadius: 10,
        borderCurve: 'continuous',
        marginTop: 40,
        marginLeft: -30,
        backgroundColor: 'white',
        width: 160,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 20,
    },
});

export default HomeHeader;