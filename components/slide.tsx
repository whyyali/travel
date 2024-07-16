import { COLORS, SIZES, TEXT } from '@/constants/theme';
import { Image, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import ReusableText from './resuable/text';
import ReusableButton from './resuable/button';

type Props = {
    item: {
        id: number,
        image: any,
        title: string,
    }
}


const Slide = ({ item }: Props) => {
    return (
        <View>
            <Image source={item.image} style={styles.image} />
            <View style={styles.slide}>
                <ReusableText text={item.title} size={TEXT.xLarge} color={COLORS.white} family={"medium"} />
                <View style={{ height: 25 }} />
                <ReusableButton onPress={() => { router.navigate("(auth)/authTab") }} title="Let's Go" textColor={COLORS.white} width={(SIZES.width - 50) / 2.2} bgColor={COLORS.red} borderColor={COLORS.green} borderWidth={0} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "cover",
        width: SIZES.width,
        height: SIZES.height + 30
    },
    slide: {
        position: "absolute",
        bottom: 0,
        marginBottom: 80,
        marginHorizontal: 20,
    }
})

export default Slide