import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLORS, TEXT } from '@/constants/theme'
import { AntDesign } from '@expo/vector-icons'
import ReusableText from './text'


type BarProps = {
    title: string,
    bgColor?: string,
    bgColor1?: string,
    onPressBack: () => void,
    onPressSearch: () => void,
}

const ReusableBar = ({ title, bgColor, bgColor1, onPressBack, onPressSearch }: BarProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity style={[styles.box, {backgroundColor: bgColor}]} onPress={onPressBack}><AntDesign name='left' size={26} /></TouchableOpacity>
                <ReusableText text={title} color={COLORS.black} size={TEXT.large} family={"medium"} />
                <TouchableOpacity style={[styles.box, {backgroundColor: bgColor1}]} onPress={onPressSearch}><AntDesign name='search1' size={26} /></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 10,
        right: 0,
        left: 0,
        justifyContent: "center"
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    box: {
        width: 30,
        height: 30,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default ReusableBar