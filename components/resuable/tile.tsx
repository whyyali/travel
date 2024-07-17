import { COLORS, SIZES } from '@/constants/theme'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import ReusableImage from './image'
import ReusableText from './text'
import Rating from '../rating'

type TileProps = {
  item: {
    _id: string,
    title: string,
    location: string,
    rating: string | number,
    review: string | number,
    image: any
  },
  onPress: () => void,
}

const ReusableTile = ({ item, onPress }: TileProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.wrapper}>
        <ReusableImage source={item.image} width={80} height={80} radius={12} />

        <View style={{ width: 15 }} />

        <View >
          <ReusableText text={item.title} family={"400"} color={COLORS.black} size={SIZES.medium} />
          <View style={{ height: 8 }} />
          <ReusableText text={item.location} family={"300"} color={COLORS.gray} size={14} />
          <View style={{ height: 8 }} />
          <View style={styles.wrapper}>
            <Rating rating={item.rating}/>
            <View style={{ width: 5 }} />
            <ReusableText text={`(${item.review}) Reviews`} family={"300"} color={COLORS.gray} size={14} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
})

export default ReusableTile