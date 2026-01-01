import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import CustomText from './CustomText';
import { COLORS } from '../assets/variables/vars';

const WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = WIDTH / 1.06;

const CategoryCard = ({ item, index, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(14)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 420,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        style={styles.card}
        onPress={() => onPress(item)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* BACKGROUND IMAGE */}
        <Image
          source={{ uri: item.image }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />

        {/* BLUR OVERLAY */}
        {Platform.OS === 'ios' ? (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={28}
            reducedTransparencyFallbackColor="#0f0b10"
          />
        ) : (
          <View style={styles.androidOverlay} />
        )}

        {/* CONTENT */}
        <View style={styles.content}>
          {/* AVATAR */}
          <Image source={{ uri: 'http://192.168.29.97:3000/image' }} style={styles.avatar} />

          {/* TEXT */}
          <View style={styles.textWrap}>
            <CustomText size="text_body" style={styles.title}>
              {item.title}
            </CustomText>
            <CustomText
              numberOfLines={2}
              ellipsizeMode="tail"
              size="text_small"
              style={styles.subtitle}
            >
              {item.description}
            </CustomText>
          </View>

          {/* STATUS DOT */}
          <View style={styles.statusDot} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },

  card: {
    width: CARD_WIDTH,
    height: 104,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#0f0b10',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 9,
  },

  androidOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,10,16,0.78)',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
    gap: 14,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1a1a1a',

    borderWidth: 1,
    borderColor: 'rgba(255,90,120,0.35)',

    shadowColor: '#ff4d6d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  textWrap: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  subtitle: {
    color: 'rgba(255,200,210,0.75)',
    marginTop: 1,
    lineHeight: 18,
    maxWidth: '90%',
    textTransform: 'capitalize',
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff4d6d',
    opacity: 0.85,
  },
});

export default CategoryCard;
