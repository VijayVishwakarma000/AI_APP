import React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { COLORS } from './assets/variables/vars';
import Home from './screens/Home';
import Sidebar from './components/Sidebar';
import CustomText from './components/CustomText';
import Category from './screens/Category';
import LustLounge from './screens/LustLounge';
import UserProvider from './hooks/UserProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

// Dummy screens (replace later)

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,

        // 👇 THIS IS THE IMPORTANT PART
        drawerType: 'front',

        overlayColor: 'rgba(0,0,0,0.45)',

        drawerStyle: {
          backgroundColor: 'transparent',
          width: Dimensions.get('window').width / 1.5,
        },

        sceneStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen
        options={{ freezeOnBlur: true }}
        name="category"
        component={Category}
      /> */}
      {/* <Drawer.Screen
        options={{ freezeOnBlur: true }}
        name="lustlounge"
        component={LustLounge}
      /> */}
    </Drawer.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <UserProvider>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <StatusBar
            backgroundColor={COLORS.color_primary}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
      
        </SafeAreaView>
      </UserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.color_primary,
  },
});

export default App;
