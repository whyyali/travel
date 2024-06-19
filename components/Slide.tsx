import React from 'react';
import { Image, StyleSheet, View } from 'react-native'
import { COLORS, SIZES, TEXT } from '@/constants/Colors';
import ReusableText from './ReusableText';
import ReusableButton from './ReusableButton';
import { router } from 'expo-router';

type SlideProps = {
    item: {
        id: number;
        image: any;
        title: string;
    };
};

const Slide: React.FC<SlideProps> = ({ item }) => {
    return (
        <View>
            <Image source={item.image} style={styles.slide} />
            <View style={styles.slideStack}>
                <ReusableText text={item.title} size={TEXT.xxLarge} color={COLORS.white} family={"medium"} />
                <View style={{height: 20}} />
                <ReusableButton title={"Let's go"} onPress={() => {router.replace("(tabs)")}} textColor={COLORS.white} width={(SIZES.width - 50) / 2.2} bgColor={COLORS.red} borderColor={COLORS.red} borderWidth={0} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slide: {
        resizeMode: "cover",
        width: SIZES.width,
        height: SIZES.height + 36
    },
    slideStack: {
        position: "absolute",
        bottom: 0,
        marginBottom: 60,
        marginHorizontal: 20
    }
})

export default Slide