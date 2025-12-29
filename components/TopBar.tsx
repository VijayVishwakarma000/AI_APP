import { View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../assets/variables/vars';
import {
  useNavigation,
  StackActions,
  CommonActions,
} from '@react-navigation/native';

const TopBar = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 20,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: COLORS.color_secondary,
      }}
    >
      <ArrowLeft
        size={28}
        color={COLORS.color_tertiary}
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            }),
          )
        }
      />
      <CustomText size="text_medium">{title}</CustomText>
    </View>
  );
};

export default TopBar;
