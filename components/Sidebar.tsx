import { View, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import CustomText from './CustomText';
import { COLORS } from '../assets/variables/vars';
import {
  User,
  Home,
  History,
  Star,
  Settings,
  Sun,
  Moon,
  Heart,
  Venus,
} from 'lucide-react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import ChatList from './ChatList';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Sidebar = ({ navigation, state }: DrawerContentComponentProps) => {
  const [darkMode, setDarkMode] = useState(true);

  const activeRoute = state.routeNames[state.index];

  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebar_child}>
        {/* ================= HEADER ================= */}
        <View style={styles.uname}>
          <Image style={styles.pfp} source={require('../assets/pfp.jpg')} />
          <View>
            <CustomText size="text_medium">Hi, Doggie</CustomText>
            <CustomText size="text_small" style={styles.subText}>
              Welcome back
            </CustomText>
          </View>
        </View>

        {/* ================= NAV ITEMS ================= */}
        <View style={styles.navSection}>
          <DrawerItem
            icon={Home}
            label="Home"
            active={activeRoute === 'Home'}
            onPress={() => navigation.navigate('Home')}
          />
          {/* <DrawerItem
            icon={Venus}
            label="AI Girlfriends"
            active={activeRoute === 'category'}
            onPress={() => navigation.navigate('category')}
          /> */}
          {/* <DrawerItem
            icon={Heart}
            label="Lust Lounge"
            active={activeRoute === 'lustlounge'}
            onPress={() => navigation.navigate('lustlounge')}
          /> */}
        </View>

        <View style={styles.chats_list}>
          <View style={styles.divider} />
          <CustomText
            style={{ color: COLORS.color_secondary,
              paddingHorizontal:5
             }}
            size="text_small"
          >
            Chats 
          </CustomText>
          <ChatList />
        </View>

        {/* ================= FOOTER ================= */}
        <View style={styles.footer}>
          <Pressable
            style={styles.themeSwitch}
            onPress={() => setDarkMode(prev => !prev)}
          >
            {darkMode ? (
              <Moon size={20} color={COLORS.color_tertiary} />
            ) : (
              <Sun size={20} color={COLORS.color_tertiary} />
            )}
            <CustomText size="text_small">
              {darkMode ? 'Dark mode' : 'Light mode'}
            </CustomText>
          </Pressable>

          <Pressable
            style={styles.settingsBtn}
            onPress={() => navigation.navigate('Settings')}
          >
            <Settings size={20} color={COLORS.color_tertiary} />
            <CustomText size="text_small">Settings</CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const DrawerItem = ({ icon: Icon, label, active, onPress }: any) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.navItem, active && styles.navItemActive]}
    >
      {active && <View style={styles.activeIndicator} />}

      <Icon
        size={20}
        color={active ? COLORS.color_tertiary : COLORS.color_secondary}
      />

      <CustomText
        size="text_small"
        style={{
          color: active ? COLORS.color_tertiary : COLORS.color_secondary,
        }}
      >
        {label}
      </CustomText>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: COLORS.color_secondary,
    marginBottom: 6,
  },
  chats_list: {
    flexGrow: 1,
    padding: 10,
  },
  pfp: {
    height: 50,
    width: 50,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  sidebar: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  sidebar_child: {
    flexGrow: 1,
    width: WIDTH / 1.5,
    backgroundColor: COLORS.color_selective,
  },

  uname: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.color_secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  subText: {
    color: COLORS.color_secondary,
    marginTop: 2,
  },

  navSection: {
    paddingTop: 10,
  },

  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  navItemActive: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  activeIndicator: {
    position: 'absolute',
    left: 0,
    width: 3,
    height: '100%',
    backgroundColor: COLORS.color_tertiary,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  footer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.color_secondary,
    gap: 16,
  },

  themeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default Sidebar;
