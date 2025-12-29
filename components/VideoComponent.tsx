import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  PanResponder,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Video, { VideoRef } from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';
import { Play, VolumeX, Volume2 } from 'lucide-react-native';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const VideoComponent = ({
  isVisible,
  title = 'Video title',
  description = 'This is a video description',
}: {
  isVisible: boolean;
  title?: string;
  description?: string;
}) => {
  const videoRef = useRef<VideoRef | null>(null);
  const isFocused = useIsFocused();

  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  /* ---------- Playback Control ---------- */
  useEffect(() => {
    if (isVisible && isFocused) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [isVisible, isFocused]);

  /* ---------- Seek Handling ---------- */
  const seekResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsSeeking(true);
        setPaused(true);
      },
      onPanResponderMove: (_, g) => {
        const ratio = Math.min(Math.max(g.moveX / WIDTH, 0), 1);
        setProgress(ratio);
      },
      onPanResponderRelease: () => {
        if (videoRef.current && duration > 0) {
          videoRef.current.seek(progress * duration);
        }
        setIsSeeking(false);
        setPaused(false);
      },
    })
  ).current;

  if (!isVisible) {
    return <View style={styles.placeholder} />;
  }

  return (
    <View style={styles.container}>
    {/* VIDEO */}
    <Video
      ref={videoRef}
      source={require('../assets/test.mp4')}
      style={styles.video}
      resizeMode="contain"
      repeat
      paused={paused}
      muted={muted}
      playInBackground={false}
      playWhenInactive={false}
      ignoreSilentSwitch="ignore"
      controls={false}
      onLoad={({ duration }) => setDuration(duration)}
      onProgress={e => {
        if (!isSeeking && e.seekableDuration > 0) {
          setProgress(e.currentTime / e.seekableDuration);
        }
      }}
    />

    {/* SEEK BAR (ABOVE TAP OVERLAY) */}
    <View style={styles.seekBar} {...seekResponder.panHandlers}>
      <View
        style={[
          styles.seekFill,
          { width: `${progress * 100}%` },
        ]}
      />
    </View>

    {/* TAP OVERLAY */}
    <Pressable
      style={StyleSheet.absoluteFill}
      onPress={() => setPaused(p => !p)}
    />

    {/* PLAY ICON */}
    {paused && (
      <View style={styles.centerIcon}>
        <Play size={72} color="white" />
      </View>
    )}

    {/* MUTE BUTTON */}
    <Pressable
      style={styles.muteBtn}
      onPress={() => setMuted(m => !m)}
    >
      {muted ? (
        <VolumeX size={22} color="white" />
      ) : (
        <Volume2 size={22} color="white" />
      )}
    </Pressable>

    {/* DETAILS */}
    <View style={styles.details}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'black',
      overflow: 'hidden', // 🔥 REQUIRED FOR SEEK BAR
  },
  video: {
    height: HEIGHT,
    width: WIDTH,
  },
  placeholder: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'black',
  },
  centerIcon: {
    position: 'absolute',
    alignSelf: 'center',
    top: HEIGHT / 2 - 36,
    opacity: 0.85,
  },
  muteBtn: {
    position: 'absolute',
    bottom: 70,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  seekBar: {
    position: 'absolute',
    bottom: 1,
    height: 3,
    width: WIDTH,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  seekFill: {
    height: '100%',
    backgroundColor: 'white',
  },
  details: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    right: 16,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: 'white',
    fontSize: 14,
    opacity: 0.85,
  },
});

export default VideoComponent;
