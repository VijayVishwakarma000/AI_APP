import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { COLORS, FONTS, TEXT } from '../assets/variables/vars';
import Switch from './Switch';
import { Box, ChevronRight, SendHorizonal } from 'lucide-react-native';
import CustomText from './CustomText';

interface PromtProps{
prompt:string,
setPrompt:Dispatch<SetStateAction<string>>,
sendMessages:Function
}

const PromptField = ({prompt,setPrompt,sendMessages}:PromtProps) => {
 
  return (
    <View style={styles.container}>
      {/* Top Input */}
      <TextInput
        style={styles.input}
        placeholder="Describe what you like and let AI do the magic!.."
        placeholderTextColor="#9A9A9A"
        multiline
        value={prompt}
        onChangeText={setPrompt}
        textAlignVertical="top"
      />

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <Pressable style={styles.aiChip}>
          <Image
            source={require('../assets/pfp.jpg')}
            style={styles.aiAvatar}
          />
          <CustomText size="text_small">Luna AI</CustomText>
          <ChevronRight size={18} color={COLORS.color_tertiary} />
        </Pressable>
        <Pressable onPress={()=>sendMessages()} style={styles.iconBtn}>
          <SendHorizonal size={18} color={COLORS.color_tertiary} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.color_selective,
    borderRadius: 15,
    padding: 14,
    gap: 12,
  },

  input: {
    minHeight: 56,
    color: '#FFFFFF',
    fontSize: TEXT.text_small,
    lineHeight: 20,
  },
  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 5,
    paddingVertical: 6,
    paddingRight: 8,
    borderRadius: 20,
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },

  aiChipActive: {
    backgroundColor: COLORS.color_tertiary,
    borderColor: COLORS.color_tertiary,
  },

  aiAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },

  aiName: {
    fontSize: 13,
    color: '#9A9A9A',
    fontWeight: '600',
  },

  aiNameActive: {
    color: COLORS.color_primary,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  label: {
    color: '#CFCFCF',
    fontSize: 13,
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

export default PromptField;
