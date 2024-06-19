import React from 'react';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';

type ImageBoxProps = {
  source: ImageSourcePropType;
  height: number;
  width: number;
  radius: number;
};

const ImageBox: React.FC<ImageBoxProps> = ({ source, height, width, radius }) => {
  return (
    <View>
      <Image
        source={source}
        style={[styles.CountryImageBox, { height, width, borderRadius: radius }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CountryImageBox: {
    resizeMode: 'cover',
  },
});

export default ImageBox;
