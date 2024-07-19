import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { TEXT } from '@/constants/theme'

type Props = {
    comment: string,
    lines: number
}

const ReusableComment = ({comment, lines}: Props) => {
    const [fullDescription, setFullDescription] = useState(false);
  return (
    <View>
     {fullDescription ? (
        <TouchableWithoutFeedback onPress={() => setFullDescription(prev => !prev)}>
            <Text style={styles.box}>{comment}</Text>
        </TouchableWithoutFeedback>
     ): (
        <TouchableWithoutFeedback onPress={() => setFullDescription(prev => !prev)}>
            <Text numberOfLines={lines} style={styles.box}>{comment}</Text>
        </TouchableWithoutFeedback>
     )}
    </View>
  )
}

const styles = StyleSheet.create({
    box:{
        paddingVertical: 10,
        fontWeight: "300",
        fontSize: TEXT.small,
    }
});

export default ReusableComment