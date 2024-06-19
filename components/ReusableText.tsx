import React from 'react';
import { Text, TextStyle } from 'react-native';

type ReusableTextProps = {
  text: string;
  color?: string;
  size?: number;
  family?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
};

const ReusableText: React.FC<ReusableTextProps> = ({ text, color, size, family, align }) => {
  return (
    <Text style={{ color, fontSize: size, fontWeight: family, textAlign: align }}>
      {text}
    </Text>
  );
};

export default ReusableText;
