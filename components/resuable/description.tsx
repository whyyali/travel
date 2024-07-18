import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { TEXT } from '@/constants/theme';
import { useState } from 'react';

type DescriptionProps = {
    text: string,
    lines: number,
}

const ReusableDescription = ({text, lines}: DescriptionProps) => {
    const [fullDescription, setFullDescription] = useState(false);
  return (
    <View>
      {fullDescription ? (
        <TouchableWithoutFeedback onPress={() => setFullDescription(prev => !prev)}>
            <Text style={styles.box}>{text}</Text>
        </TouchableWithoutFeedback>
      ):(
        <TouchableWithoutFeedback onPress={() => setFullDescription(prev => !prev)}>
            <Text numberOfLines={lines} style={styles.box}>{text}</Text>
        </TouchableWithoutFeedback>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    box:{
        paddingVertical: 10,
        fontWeight: "300",
        fontSize: TEXT.medium,
    }
})

export default ReusableDescription