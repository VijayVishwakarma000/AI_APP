import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import { ChevronRight } from 'lucide-react-native';
import { TEXT } from '../assets/variables/vars';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const arr = [
  require('../assets/test.jpg'),
  require('../assets/test2.png'),
  require('../assets/test3.png'),
];

const OFFSET_Y = 16;

const ImageStack = () => {
  return (
    <View style={styles.wrapper}>
     {arr.map((img, id) => (
  <View
    key={id}
    style={{
      position: 'absolute',
      top: -id * OFFSET_Y,
      zIndex: arr.length - id,
      opacity: 1 - id * 0.15,
      transform: [{ scale: 1 - id * 0.06 }],
    }}
  >
    {/* IMAGE (UNCHANGED) */}
    <Animated.Image
      source={img}
      blurRadius={id === 0 ? 0 : id * 3}
      style={styles.imgstyle}
    />

    {/* 🔥 OVERLAY — ONLY ON FIRST IMAGE */}
    {id === 0 && (
      <View style={styles.collectionOverlay}>
        {/* <Animated.Image
          blurRadius={1}
          style={styles.overlayBlur}
        /> */}

        <View style={styles.overlayContent}>
          <View>
            <Text style={styles.overlayTitle}>Collection (53)</Text>
    
          </View>
          <ChevronRight size={18} color="#fff" />
        </View>
      </View>
    )}
  </View>
))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    height: HEIGHT / 4 + arr.length * OFFSET_Y,
    width: WIDTH,
  },
  imgstyle: {
    height: HEIGHT / 4,
    width: WIDTH - 30,
    resizeMode: 'cover',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
   
  overlay: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    borderRadius: 12,
    overflow: 'hidden',
  },

  collectionOverlay: {
  position: 'absolute',
  left: 0,
  bottom: 0,
  borderBottomRightRadius:15,
  borderBottomLeftRadius:15,
  overflow: 'hidden',
  width:"100%",
},

overlayBlur: {
  ...StyleSheet.absoluteFillObject,
  resizeMode: 'cover',
},

overlayContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:"space-between",
  gap: 10,
  padding: 14,
  backgroundColor: 'rgba(0,0,0,0.65)',
},

overlayTitle: {
  color: '#fff',
  fontSize: 20,
},

overlayCount: {
  color: '#fff',
  fontSize: 11,
  opacity: 0.8,
},
});

export default ImageStack;
