import React from 'react';
import { SIZES } from '@/constants/Colors';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

type ReusableButtonProps = {
  onPress: () => void;
  title: string;
  textColor?: string;
  width?: any;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
};

const ReusableButton: React.FC<ReusableButtonProps> = ({
  onPress, title, textColor = 'black', width = '100%', bgColor = 'transparent',borderColor = 'transparent', borderWidth = 0}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.ButtonStyle, {width, backgroundColor:bgColor, borderColor, borderWidth}]}>
      <Text style={[styles.ButtonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ReusableButton;

const styles = StyleSheet.create({
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: SIZES.small,
    width: '100%' as any,
    backgroundColor: 'transparent' as string,
    borderColor: 'transparent' as string,
    borderWidth: 0 as number
  },
  ButtonText: {
    fontWeight: '500',
    fontSize: SIZES.medium
  }
});
