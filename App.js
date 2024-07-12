// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import AllowPermissionsScreen from './AllowPermissionsScreen';
import PhoneNumberScreen from './PhoneNumberScreen';
import VerificationScreen from './VerificationScreen';
import UserInfoScreen from './UserInfoScreen';
import SetupCompleteScreen from './SetupCompleteScreen';
import HomePageScreen from './HomePageScreen';
import MessageScreen from './MessageScreen';
import StoriesScreen from './StoriesScreen';
import CallsScreen from './CallsScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import PolicyScreen from './PolicyScreen';
import ProfileScreen from './ProfileScreen';
import CameraScreen from './CameraScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllowPermissions"
          component={AllowPermissionsScreen}
          options={{ headerShown: false }}
        />
        
                <Stack.Screen
          name="Policy"
          component={PolicyScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PhoneNumber"
          component={PhoneNumberScreen}
          options={{ headerTitle: 'Enter Phone Number', headerRight: () => null }}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{ headerTitle: 'Verification Code', headerRight: () => null }}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SetupComplete"
          component={SetupCompleteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePageScreen}
          options={{ headerShown: false }}
        />
                <Stack.Screen
          name="Stories"
          component={StoriesScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Calls"
          component={CallsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Message"
          component={MessageScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen name="Profile" component={ProfileScreen} />
         <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ headerTitle: 'Privacy Policy', headerRight: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
