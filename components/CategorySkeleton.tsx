// components/CategorySkeleton.jsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../assets/variables/vars';

const WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (WIDTH - 48) / 2;

const CategorySkeleton = () => {
  return <View style={styles.skeleton} />;
};

const styles = StyleSheet.create({
  skeleton: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    borderRadius: 18,
    marginBottom: 16,
    backgroundColor: COLORS.color_selective,
    opacity: 0.5,
  },
});

export default CategorySkeleton;
