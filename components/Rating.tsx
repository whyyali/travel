import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ReusableText from './ReusableText'

type RatingProps = {
  rating: any
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='star' size={20} color={'#fd9942'} />
      <View style={{ width: 5 }} />
      <ReusableText text={rating} family={'300'} size={15} color={'#fd9942'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }
})

export default Rating