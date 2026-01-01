import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, TEXT } from '../assets/variables/vars';
import { ChevronRight, SendHorizonal } from 'lucide-react-native';
import CustomText from './CustomText';

interface PromptProps {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  sendMessages: () => void;
  openBots: () => void;
  selectedTitle:string;
}

const PromptField = ({
  openBots,
  prompt,
  selectedTitle,
  setPrompt,
  sendMessages,
}: PromptProps) => {
  const [focused, setFocused] = useState(false);

  return (
      <View style={styles.wrapper}>
  {focused && (
    <LinearGradient
      colors={[
        '#ff3cac',
        '#784ba0',
        '#2b86c5',
        '#43e97b',
        '#f9ca24',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBorder}
    />
  )}

  <View style={styles.container}>
    {/* INPUT */}
    <TextInput
      style={styles.input}
      placeholder="Describe what you like and let AI do the magic!.."
      placeholderTextColor="#9A9A9A"
      multiline
      value={prompt}
      onChangeText={setPrompt}
      textAlignVertical="top"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />

    {/* BOTTOM ROW */}
    <View style={styles.bottomRow}>
      <Pressable onPress={openBots} style={styles.aiChip}>
        <Image
          source={{uri:'http://192.168.29.97:3000/image'}}
          style={styles.aiAvatar}
        />
        <CustomText size="text_small">{selectedTitle}</CustomText>
        <ChevronRight size={18} color={COLORS.color_tertiary} />
      </Pressable>

      <Pressable onPress={sendMessages} style={styles.iconBtn}>
        <SendHorizonal size={18} color={COLORS.color_tertiary} />
      </Pressable>
    </View>
  </View>
</View>

  );
};

export default PromptField;
 const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    borderRadius: 16,
    padding: 2,              // 👈 creates visible border
  },

  gradientBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },

  container: {
    backgroundColor: COLORS.color_selective,
    borderRadius: 14,        // 👈 slightly smaller
    padding: 14,
    gap: 12,
  },

  input: {
    minHeight: 56,
    color: '#FFFFFF',
    fontSize: TEXT.text_small,
    lineHeight: 20,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
    paddingRight: 8,
    borderRadius: 20,
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },

  aiAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },

  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
  },
});
