import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, TEXT } from '@/constants/theme'
import ReusableImage from '../resuable/image'
import ReusableText from '../resuable/text'
import { router } from 'expo-router'
import { CountryProps } from '@/utils/utils'

const Country = ({item}: CountryProps) => {
  return (
    <TouchableOpacity onPress={() => {router.push({pathname:"(details)/countryDetails", params: {item: JSON.stringify(item)} })}}>
      <View>
        <ReusableImage source={item.image} height={90} width={90} radius={12} />
        <View style={{height: 5}}/>
        <ReusableText text={item.country} family={"500"} size={TEXT.medium} align={"center"} color={COLORS.black}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})

export default Country