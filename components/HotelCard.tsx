import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '@/constants/Colors';
import ImageBox from './ImageBox';
import { imageHotels } from "../images";
import ReusableText from './ReusableText';
import Rating from './Rating';

type HotelItemType = {
  title: string;
  location: string;
  rating: number;
};

type HotelCardProps = {
  item: HotelItemType;
  margin: number;
  onPress: () => void;
};

const HotelCard: React.FC<HotelCardProps> = ({ item, margin, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, { marginRight: margin }]} onPress={onPress}>
      <View>
        <View style={styles.cardContainer}>
          <ImageBox source={imageHotels[item.title.toLowerCase()]} width={170} height={150} radius={16} />
        </View>

        <View style={{ height: 5 }} />

        <View style={{ paddingVertical: 2, paddingHorizontal: 15 }}>
          <ReusableText text={item.title} family={"400"} size={SIZES.medium} color={COLORS.black} />
          <View style={{ height: 5 }} />
          <ReusableText text={item.location} family={"300"} size={SIZES.medium} color={COLORS.gray} />
          <View style={{ height: 5 }} />
          <Rating rating={item.rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width / 2.2,
    height: 270,
    borderRadius: 16,
    backgroundColor: COLORS.lightWhite,
  },
  cardContainer: {
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    height: 150,
  }
});

export default HotelCard;
