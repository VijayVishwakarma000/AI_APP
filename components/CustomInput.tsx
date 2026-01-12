import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TextInputChangeEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { COLORS, TEXT } from '../assets/variables/vars';

type InputProps = {
  title: string;
  value?: string;
  onchange?: (text: string) => void;
  rest?: InputProps;
  secureTextEntry?: boolean;
};

const CustomInput = ({
  title,
  value,
  onchange,
  secureTextEntry = false,
  ...rest
}: InputProps) => {
  const [error, setError] = useState(false);
  const [focused, setfocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(0)).current;
  const labelTop = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -10],
  });
  useEffect(() => {
    if (value?.length != 0) {
      labelAnim.setValue(1);
      setError(false);
    } else {
      setError(true);
    }
  }, [value]);
  const handlePress = useCallback(() => {
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 260,
      useNativeDriver: false,
    }).start();
    setfocused(true);
  }, []);

  return (
    <View style={styles.input_parent}>
      <Animated.Text
        onPress={() => handlePress()}
        style={[
          styles.textstyle,
          {
            color: !focused ? COLORS.color_secondary : COLORS.color_tertiary,
            transform: [{ translateY: labelTop }],
          },
        ]}
      >
        {title}
      </Animated.Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        {...rest}
        onChangeText={onchange}
        onPress={() => handlePress()}
        onBlur={() => {
          if (value?.length == 0) {
            Animated.timing(labelAnim, {
              toValue: 0,
              duration: 260,
              useNativeDriver: false,
            }).start();
            setfocused(false);
          }
        }}
        style={[
          styles.inputstyle,
          { borderColor: error ? 'red' : COLORS.color_secondary },
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputstyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  textstyle: {
    color: COLORS.color_tertiary,
    backgroundColor: 'black',
    zIndex: 10,
    fontSize: TEXT.text_small,
    position: 'absolute',
    // top:10,
    left: 10,
  },
  input_parent: {
    position: 'relative',
    width: '100%',
  },
});

export default CustomInput;
