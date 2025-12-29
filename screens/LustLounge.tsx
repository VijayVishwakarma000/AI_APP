import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import React, { useRef } from 'react';
import TopBar from '../components/TopBar';
import Video, { VideoRef } from 'react-native-video';
import VideoFeed from '../components/VideoFeed';
import { CommonActions, useNavigation } from '@react-navigation/native';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const LustLounge = () => {
  
  return (
    <View style={{ flex: 1 }}>
      {/* <TopBar title="Lust Lounge" /> */}

      <VideoFeed/>
    
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    height: HEIGHT,
    flex:1,
    width:WIDTH,
    resizeMode:"contain",
    backgroundColor:"red"
  },
  flatlist: {
    flexGrow: 1,
    height: HEIGHT,
    justifyContent: 'space-between',
  },
});

export default LustLounge;
