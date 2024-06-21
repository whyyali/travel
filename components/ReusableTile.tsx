import { StyleSheet, Text, TouchableOpacity, View, GestureResponderEvent } from 'react-native'
import React from 'react'
import ImageBox from './ImageBox'
import ReusableText from './ReusableText'
import { COLORS, SIZES } from '@/constants/Colors'
import { imagePlaces, imageHotels } from "../images"
import Rating from './Rating'

type ReusableTileProps = {
    item: {
      _id: string;
      title: string;
      location: string;
      review: string;
      rating?: number; 
    };
    onPress: (event: GestureResponderEvent) => void;
  };

const ReusableTile: React.FC<ReusableTileProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.containerRow}>
                <ImageBox source={imagePlaces[item.title.toLowerCase()] || imageHotels[item.title.toLowerCase()]} width={80} height={80} radius={12} />

                <View style={{ width: 15 }} />

                <View>
                    <ReusableText text={item.title} family={"400"} color={COLORS.black} size={SIZES.medium} />
                    <View style={{ height: 8 }} />
                    <ReusableText text={item.location} family={"300"} color={COLORS.gray} size={14} />
                    <View style={{ height: 8 }} />
                    <View style={styles.containerRow}>
                        <Rating rating={item.rating} />
                        <View style={{ width: 5 }} />
                        <ReusableText text={`(${item.review}) `} family={"300"} color={COLORS.gray} size={14} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12,
    },
    containerRow:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    }
})

export default ReusableTile