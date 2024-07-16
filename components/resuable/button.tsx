import { SIZES } from '@/constants/theme';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    onPress: () => void,
    title: string,
    textColor?: string,
    width?: any,
    bgColor?: string,
    borderColor?: string,
    borderWidth?: number
}

const ReusableButton = ({ onPress, title, textColor, width, bgColor, borderColor, borderWidth }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: bgColor, borderColor: borderColor, borderWidth: borderWidth, width: width }]}>
            <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        borderRadius: SIZES.small
    },
    buttonText: {
        fontWeight: "medium",
        fontSize: SIZES.medium
    }
})

export default ReusableButton