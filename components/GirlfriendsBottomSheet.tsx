import React, {
    Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  Keyboard,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

/* ================= TYPES ================= */

type CharacterType = {
  title: string;
  description: string;
};

export type BottomSheetHandle = {
  open: () => void;
  close: () => void;
};

type Props = {
  onSelect?: (item: CharacterType) => void;
  data:CharacterType[];
   selectedTitle:string;
          setSelectedTitle:Dispatch<SetStateAction<string>>;
};

/* ================= CONSTANTS ================= */

const SHEET_HEIGHT = height * 0.5;
const OPEN = 0;
const CLOSED = SHEET_HEIGHT;

const timing = {
  duration: 280,
  easing: Easing.out(Easing.cubic),
};

/* ================= COMPONENT ================= */

const GirlfriendsBottomSheet = forwardRef<BottomSheetHandle, Props>(
  ({ onSelect,
     data,
          selectedTitle,
          setSelectedTitle,
   }, ref) => {
    const translateY = useSharedValue(CLOSED);
    const backdropOpacity = useSharedValue(0);


    /* ---------- IMPERATIVE ---------- */
    useImperativeHandle(ref, () => ({
      open() {
        Keyboard.dismiss();
        backdropOpacity.value = withTiming(1, { duration: 180 });
        translateY.value = withTiming(OPEN, timing);
      },
      close() {
        backdropOpacity.value = withTiming(0, { duration: 180 });
        translateY.value = withTiming(CLOSED, timing);
      },
    }));

    /* ---------- HANDLE DRAG GESTURE ---------- */
    const handlePan = Gesture.Pan()
      .onUpdate((e) => {
        const next = e.translationY;
        if (next > 0 && next <= CLOSED) {
          translateY.value = next;
        }
      })
      .onEnd((e) => {
        if (e.translationY > 120) {
          backdropOpacity.value = withTiming(0);
          translateY.value = withTiming(CLOSED, timing);
        } else {
          translateY.value = withTiming(OPEN, timing);
        }
      });

    /* ---------- ANIMATED STYLES ---------- */
    const sheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const backdropStyle = useAnimatedStyle(() => ({
      opacity: backdropOpacity.value,
      pointerEvents: backdropOpacity.value === 0 ? 'none' : 'auto',
    }));

    /* ---------- ITEM ---------- */
    const renderItem = ({ item }: { item: CharacterType }) => {
      const selected = item.title === selectedTitle;

      return (
        <Pressable
          style={[styles.item, selected && styles.itemSelected]}
          onPress={() => {
            setSelectedTitle(item.title);
            onSelect?.(item);
          }}
        >
          <Image
            source={{ uri: 'http://192.168.29.97:3000/image' }}
            style={styles.avatar}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.sub} numberOfLines={1}>
              {item.description}
            </Text>
          </View>

          {selected && <View style={styles.dot} />}
        </Pressable>
      );
    };

    /* ---------- RENDER ---------- */
    return (
      <>
        {/* BACKDROP */}
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="rgba(0,0,0,0.8)"
          />

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              backdropOpacity.value = withTiming(0);
              translateY.value = withTiming(CLOSED, timing);
            }}
          />
        </Animated.View>

        {/* SHEET */}
        <Animated.View style={[styles.sheet, sheetStyle]}>
          {/* HANDLE ONLY */}
          <GestureDetector gesture={handlePan}>
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          </GestureDetector>

          {/* LIST (FREE SCROLL) */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
          />
        </Animated.View>
      </>
    );
  }
);

export default GirlfriendsBottomSheet;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
  },

  sheet: {
    position: 'absolute',
    bottom: 0,
    height: SHEET_HEIGHT,
    width: '100%',
    backgroundColor: '#0f0b10',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    zIndex: 50,
  },

  handleContainer: {
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },

  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },

  itemSelected: {
    borderColor: 'rgba(255,90,120,0.5)',
    borderWidth: 1,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
  },

  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  sub: {
    color: 'rgba(255,200,210,0.65)',
    fontSize: 12,
    marginTop: 4,
    textTransform:"capitalize"
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4d6d',
    marginLeft: 10,
  },
});
