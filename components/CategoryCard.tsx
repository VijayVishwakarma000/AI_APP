// components/CategoryCard.jsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';
import CustomText from './CustomText';
import { COLORS } from '../assets/variables/vars';

const WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (WIDTH - 48) / 2;

const CategoryCard = ({ item, index, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: translateAnim }],
      }}
    >
      <Pressable style={styles.card} onPress={() => onPress(item)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlay} />
        <View style={styles.textWrap}>
          <CustomText size="text_body" style={styles.title}>
            {item.title}
          </CustomText>
          <CustomText size="text_small" style={styles.subtitle}>
            {item.subtitle}
          </CustomText>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: COLORS.color_selective,
  },
  image: {
    ...StyleSheet.absoluteFill,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  textWrap: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
  },
  subtitle: {
    color: '#CFCFCF',
    marginTop: 2,
  },
});

export default CategoryCard;
