import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES } from '@/constants/theme'
import ReusableImage from '../resuable/image'
import ReusableText from '../resuable/text'
import Rating from '../rating'

type HotelProps = {
    item: {
        _id: any,
        image: any,
        location: string,
        title: string,
        rating: number | string,
    }
    onPress: () => void,
    margin: number | any,
}

const HotelCard = ({item, onPress, margin} : HotelProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {marginRight: margin}]}>
        <View>
            <View style={styles.image}>
                <ReusableImage source={item.image} width={170} height={150} radius={16} />
            </View>

            <View style={{height: 5}}/>

            <View style={{paddingVertical: 2, paddingHorizontal: 15}}>
                <ReusableText text={item.title} family={"400"} size={SIZES.medium} color={COLORS.black}/>
                <View style={{height: 5}}/>
                <ReusableText text={item.location} family={"300"} size={SIZES.medium} color={COLORS.gray}/>
                <View style={{height: 5}}/>
                <Rating rating={item.rating} />
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width: SIZES.width / 2.2,
        height: 270,
        borderRadius: 16,
        backgroundColor: COLORS.lightWhite,
    },
    image:{
        alignItems: "center",
        marginTop: 10,
        width: "100%",
        height: 150,
    }
})

export default HotelCard