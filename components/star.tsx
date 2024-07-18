import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface StarProps {
  size?: number;
  color?: string;
}

const Star: React.FC<StarProps> = ({ size = 24, color = '#FFD700' }) => {
  return (
    <View style={[styles.starContainer, { width: size, height: size }]}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
      >
        <Path d="M12 1.9l3.09 6.26L22 9.27l-5 4.87L17.91 21 12 17.27 6.09 21 7 14.14l-5-4.87 6.91-1.11L12 1.9z" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Star;
