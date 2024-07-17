import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import ReusableText from './resuable/text'

type Props = {
    rating: any
}

const Rating = ({ rating }: Props) => {
    return (
        <View style={styles.wrapper}>
            <MaterialCommunityIcons name='star' size={20} color={'#fd9942'} />
            <View style={{ width: 5 }} />
            <ReusableText text={rating} family={'300'} size={15} color={'#fd9942'} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    }
})

export default Rating