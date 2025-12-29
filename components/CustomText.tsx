import React from 'react';
import { Text, TextStyle } from 'react-native';
import { TEXT, FONTS, COLORS } from '../assets/variables/vars';

type TextSize = keyof typeof TEXT;

interface CustomTextProps {
  children: React.ReactNode;
  size?: TextSize;
  style?: TextStyle;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  size = 'text_body',
  style,
}) => {
  return (
    <Text
      style={[
        {
          fontSize: TEXT[size],
          fontFamily: FONTS.normal,
          color:COLORS.color_tertiary
        },
        style,
      ]}
    >{children}</Text>
  );
};

export default CustomText;
