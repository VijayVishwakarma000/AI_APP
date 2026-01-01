import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { TEXT, FONTS, COLORS } from '../assets/variables/vars';

type TextSize = keyof typeof TEXT;

interface CustomTextProps {
  children: React.ReactNode;
  size?: TextSize;
  style?: TextStyle;
  props?:TextProps
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  size = 'text_body',
  style,
  ...props
}) => {
  return (
    <Text
    {...props}
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
