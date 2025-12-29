import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { COLORS } from '../assets/variables/vars';

const SWITCH_WIDTH = 46;
const SWITCH_HEIGHT = 26;
const THUMB_SIZE = 22;
const PADDING = 2;

const Switch = ({ value, onChange }) => {
  // 🔒 initialize ONCE
  const progress = useSharedValue(0);

  // 🔄 sync shared value with prop
  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 180 });
  }, [value]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#2c2c2c', COLORS.color_tertiary]
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          progress.value *
          (SWITCH_WIDTH - THUMB_SIZE - PADDING * 2),
      },
    ],
    backgroundColor:
      progress.value === 1
        ? COLORS.color_primary
        : '#ffffff',
  }));

  const toggle = () => {
    onChange?.(!value);
  };

  return (
    <Pressable onPress={toggle}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  track: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    padding: PADDING,
    justifyContent: 'center',
  },

  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
  },
});

export default Switch;
