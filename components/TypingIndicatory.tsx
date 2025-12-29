import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  AnimationCallback,
} from 'react-native-reanimated';
import { COLORS } from '../assets/variables/vars';

const Dot = ({ delay }: { delay?: AnimationCallback }) => {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 600 }),
      -1,
      true,
      delay
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.dot, style]} />;
};

const TypingIndicator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Dot />
        <Dot />
        <Dot />
      </View>
    </View>
  );
};

export default TypingIndicator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    backgroundColor: COLORS.color_selective,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333',
    marginHorizontal: 3,
  },
});
